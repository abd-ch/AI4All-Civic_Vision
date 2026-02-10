import { useRef, useCallback, useEffect } from 'react';
import Map, { type MapRef } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { hotspots } from '../../data/hotspots';
import { mockProposals } from '../../data/mockProposals';
import { useAppStore } from '../../store/useAppStore';
import { HotspotMarker } from './HotspotMarker';
import { HeatmapLayer } from './HeatmapLayer';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

const INITIAL_VIEW = {
  longitude: 2.1734,
  latitude: 41.3870,
  zoom: 14,
  pitch: 60,
  bearing: -17,
};

export function MapView() {
  const mapRef = useRef<MapRef>(null);
  const { setSelectedHotspot, setSelectedProposal, setShowProposalPanel, mapResetTrigger } = useAppStore();

  const handleHotspotClick = useCallback(
    (hotspotId: string) => {
      const hotspot = hotspots.find((h) => h.id === hotspotId);
      const proposal = mockProposals.find((p) => p.hotspotId === hotspotId);

      if (hotspot) {
        setSelectedHotspot(hotspot);
        if (proposal) {
          setSelectedProposal(proposal);
        }
        setShowProposalPanel(true);

        // Fly to the hotspot
        mapRef.current?.flyTo({
          center: [hotspot.lng, hotspot.lat],
          zoom: 17,
          pitch: 65,
          bearing: Math.random() * 40 - 20, // slight variation
          duration: 2000,
          essential: true,
        });
      }
    },
    [setSelectedHotspot, setSelectedProposal, setShowProposalPanel]
  );

  // Add 3D buildings on map load
  const onMapLoad = useCallback(() => {
    const map = mapRef.current?.getMap();
    if (!map) return;

    const layers = map.getStyle().layers;
    // Find the first symbol layer to insert 3D buildings below labels
    let labelLayerId: string | undefined;
    if (layers) {
      for (const layer of layers) {
        if (layer.type === 'symbol' && (layer.layout as Record<string, unknown>)?.['text-field']) {
          labelLayerId = layer.id;
          break;
        }
      }
    }

    if (!map.getLayer('3d-buildings')) {
      map.addLayer(
        {
          id: '3d-buildings',
          source: 'composite',
          'source-layer': 'building',
          filter: ['==', 'extrude', 'true'],
          type: 'fill-extrusion',
          minzoom: 12,
          paint: {
            'fill-extrusion-color': '#D5CEC5',
            'fill-extrusion-height': ['get', 'height'],
            'fill-extrusion-base': ['get', 'min_height'],
            'fill-extrusion-opacity': 0.7,
          },
        },
        labelLayerId
      );
    }
  }, []);

  // Keyboard shortcut: Escape to reset view
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        mapRef.current?.flyTo({
          ...INITIAL_VIEW,
          center: [INITIAL_VIEW.longitude, INITIAL_VIEW.latitude],
          duration: 1500,
          essential: true,
        });
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // Reset map view when logo is clicked (via mapResetTrigger)
  useEffect(() => {
    if (mapResetTrigger > 0) {
      mapRef.current?.flyTo({
        ...INITIAL_VIEW,
        center: [INITIAL_VIEW.longitude, INITIAL_VIEW.latitude],
        duration: 1500,
        essential: true,
      });
    }
  }, [mapResetTrigger]);

  return (
    <Map
      ref={mapRef}
      initialViewState={INITIAL_VIEW}
      mapboxAccessToken={MAPBOX_TOKEN}
      mapStyle="mapbox://styles/mapbox/light-v11"
      style={{ width: '100%', height: '100%' }}
      onLoad={onMapLoad}
      maxBounds={[
        [1.9, 41.3],
        [2.35, 41.5],
      ]}
      minZoom={12}
      maxZoom={19}
      antialias
    >
      {hotspots.map((hotspot) => {
        const hasProposal = mockProposals.some((p) => p.hotspotId === hotspot.id);
        return (
          <HotspotMarker
            key={hotspot.id}
            hotspot={hotspot}
            hasProposal={hasProposal}
            onClick={handleHotspotClick}
          />
        );
      })}
      <HeatmapLayer />
    </Map>
  );
}
