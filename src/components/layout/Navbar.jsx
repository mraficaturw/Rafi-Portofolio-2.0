import { NAV_ITEMS } from '../../constants';

export default function Navbar({ activeSection, onSelectSection }) {
  return (
    <header className="header-nav-container">
      <nav className="nav-bar">
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              type="button"
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => onSelectSection(item.id)}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
}
