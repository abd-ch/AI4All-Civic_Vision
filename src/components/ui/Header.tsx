import { useAppStore } from '../../store/useAppStore';
import './Header.css';

export function Header() {
  const { selectedHotspot, clearSelection } = useAppStore();

  return (
    <header className="app-header">
      <div className="header-left">
        <h1 className="header-logo" onClick={clearSelection}>
          <span className="logo-mark">BCN</span>
          <span className="logo-text">Civic Vision</span>
        </h1>
      </div>
      <div className="header-center">
        {selectedHotspot && (
          <span className="header-breadcrumb">
            Barcelona → {selectedHotspot.neighborhood} → {selectedHotspot.name}
          </span>
        )}
      </div>
      <div className="header-right">
        <span className="header-tagline">Shape your city</span>
      </div>
    </header>
  );
}
