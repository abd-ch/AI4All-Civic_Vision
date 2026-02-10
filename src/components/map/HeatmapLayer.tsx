import { Source, Layer } from 'react-map-gl/mapbox';
import { mockProposals } from '../../data/mockProposals';
import { hotspots } from '../../data/hotspots';

/**
 * Shows a subtle heatmap of proposal density on the map.
 * For the PoC, each hotspot that has a proposal counts as 1 point.
 */
export function HeatmapLayer() {
  const geojson: GeoJSON.FeatureCollection = {
    type: 'FeatureCollection',
    features: mockProposals.map((proposal) => {
      const hotspot = hotspots.find((h) => h.id === proposal.hotspotId);
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [hotspot?.lng ?? 0, hotspot?.lat ?? 0],
        },
        properties: {
          weight: 1,
        },
      };
    }),
  };

  const heatmapPaint: Record<string, unknown> = {
    'heatmap-weight': 1,
    'heatmap-intensity': 1,
    'heatmap-radius': 60,
    'heatmap-opacity': 0.3,
    'heatmap-color': [
      'interpolate',
      ['linear'],
      ['heatmap-density'],
      0, 'rgba(107,143,113,0)',
      0.3, 'rgba(107,143,113,0.4)',
      0.6, 'rgba(196,148,58,0.6)',
      1, 'rgba(212,118,60,0.8)',
    ],
  };

  return (
    <Source id="proposal-heatmap" type="geojson" data={geojson}>
      <Layer
        id="proposal-heatmap-layer"
        type="heatmap"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        paint={heatmapPaint as any}
      />
    </Source>
  );
}
