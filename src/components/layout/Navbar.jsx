import { useState } from 'react';
import { NAV_ITEMS } from '../../constants';

export default function Navbar({ activeSection, onSelectSection }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSelect = (id) => {
    onSelectSection(id);
    setIsMenuOpen(false);
  };

  return (
    <header className={`header-nav-container ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className="mobile-menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <div className={`hamburger ${isMenuOpen ? 'open' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <nav className={`nav-bar ${isMenuOpen ? 'open' : ''}`}>
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              type="button"
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => handleSelect(item.id)}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
}
