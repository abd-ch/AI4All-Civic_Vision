import { Marker } from 'react-map-gl/mapbox';
import type { Hotspot } from '../../types';
import './HotspotMarker.css';

interface Props {
  hotspot: Hotspot;
  hasProposal: boolean;
  onClick: (id: string) => void;
}

export function HotspotMarker({ hotspot, hasProposal, onClick }: Props) {
  return (
    <Marker
      longitude={hotspot.lng}
      latitude={hotspot.lat}
      anchor="center"
      onClick={(e) => {
        e.originalEvent.stopPropagation();
        onClick(hotspot.id);
      }}
    >
      <div className="hotspot-marker-wrapper" title={hotspot.name}>
        <div className={`hotspot-marker ${hasProposal ? 'has-proposal' : ''}`}>
          <div className="hotspot-pulse" />
          <div className="hotspot-dot" />
        </div>
        <span className="hotspot-label">{hotspot.name}</span>
      </div>
    </Marker>
  );
}
