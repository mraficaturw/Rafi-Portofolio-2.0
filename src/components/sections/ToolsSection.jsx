import './ToolsSection.css';
import { toolsData } from '../../data/portfolioData';

export default function ToolsSection({ isActive }) {
  return (
    <section id="tools" className={`spa-section ${isActive ? 'active-section' : ''}`}>
      <div className="section-header">
        <span className="badge-gray">Tools</span>
        <h2 className="section-title">Tools & Technologies</h2>
        <p className="section-subtitle">
          Perangkat lunak, bahasa pemrograman, dan kerangka kerja yang saya gunakan untuk membangun produk digital unggulan.
        </p>
      </div>

      <div className="tools-grid">
        {toolsData.map((tool) => (
          <div key={tool.id} className="tool-card">
            <img src={tool.icon} className="tool-icon-box" />
            <div>
              <h3 className="tool-name">{tool.name}</h3>
              <span className="tool-category">{tool.category}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
