import { useState, useMemo } from 'react';
import './ToolsSection.css';
import { toolsData } from '../../data/portfolioData';

const CATEGORIES = [
  { id: 'all', label: 'Semua' },
  { id: 'core', label: 'Languages & Frameworks', match: ['Laravel', 'ReactJS', 'PHP', 'JavaScript'] },
  { id: 'frontend', label: 'Frontend & Styling', match: ['Tailwind CSS', 'HTML', 'CSS', 'Bootstrap', 'Figma'] },
  { id: 'backend', label: 'Backend & Database', match: ['Laravel', 'PHP', 'MySQL', 'Postman'] },
  { id: 'cloud', label: 'Cloud & Tools', match: ['Firebase', 'GCP'] },
  { id: 'Others', label: 'Other Tools', match: ['Docker', 'Github', 'VSCode', 'Google Colab'] }
];

export default function ToolsSection({ isActive }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredTools = useMemo(() => {
    if (activeCategory === 'all') return toolsData;
    const cat = CATEGORIES.find((c) => c.id === activeCategory);
    return cat ? toolsData.filter((t) => cat.match.includes(t.name)) : toolsData;
  }, [activeCategory]);

  return (
    <section id="tools" className={`spa-section ${isActive ? 'active-section' : ''}`}>
      <div className="section-header">
        <span className="badge-gray">Tools</span>
        <h2 className="section-title">Tools & Technologies</h2>
        <p className="section-subtitle">
          Perangkat lunak, bahasa pemrograman, dan kerangka kerja yang saya gunakan untuk membangun produk digital unggulan.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="tools-filter-bar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            className={`tools-filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="tools-grid">
        {filteredTools.map((tool) => (
          <div key={tool.id} className="tool-card">
            <img
              src={tool.icon}
              alt={tool.name}
              className="tool-icon-box"
              loading="lazy"
              decoding="async"
              width="48"
              height="48"
            />
            <div>
              <h3 className="tool-name">{tool.name}</h3>
              <span className="tool-category">{tool.category.trim()}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
