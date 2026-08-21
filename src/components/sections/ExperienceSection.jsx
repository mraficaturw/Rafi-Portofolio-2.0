import './ExperienceSection.css';
import { experienceData } from '../../data/portfolioData';

export default function ExperienceSection({ isActive }) {
  return (
    <section id="experience" className={`spa-section ${isActive ? 'active-section' : ''}`}>
      <div className="section-header">
        <span className="badge-gray">Experience</span>
        <h2 className="section-title">Work & Experience</h2>
        <p className="section-subtitle">
          Perjalanan karir dan pengalaman kerja profesional saya dalam pengembangan perangkat lunak.
        </p>
      </div>

      <div className="timeline">
        {experienceData.map((exp) => (
          <div key={exp.id} className="timeline-item">
            <div className="timeline-dot" />
            <div className="timeline-header">
              <h3 className="role-title">{exp.role}</h3>
              <span className="date-badge">{exp.period}</span>
            </div>
            <div className="company-name">{exp.company}</div>
            <p className="project-text">{exp.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
