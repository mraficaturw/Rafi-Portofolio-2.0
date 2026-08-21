import { useState } from 'react';
import './ProjectsSection.css';
import { projectsData } from '../../data/portfolioData';
import ProjectModal from '../features/ProjectModal/ProjectModal';

export default function ProjectsSection({ isActive }) {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleOpenModal = (e, project) => {
    e.preventDefault();
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <section id="projects" className={`spa-section ${isActive ? 'active-section' : ''}`}>
      <div className="section-header">
        <span className="badge-gray">Projects</span>
        <h2 className="section-title">Featured Projects</h2>
        <p className="section-subtitle">
          Kumpulan proyek pilihan yang menunjukkan keahlian pengembangan web, desain antarmuka, dan arsitektur frontend.
        </p>
      </div>

      <div className="projects-grid">
        {projectsData.map((project, idx) => (
          <div 
            key={project.id} 
            className="project-card" 
            onClick={(e) => handleOpenModal(e, project)}
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <div className="project-img-ph">
              {project.image ? (
                <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                project.imagePlaceholder
              )}
            </div>
            <div className="project-body">
              <div className="project-tags">
                {project.tags.map((tag, idx) => (
                  <span key={idx} className="tag-ph">
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-text">{project.description}</p>
              <div style={{ marginTop: 'auto' }}>
                <button
                  type="button"
                  className="btn-secondary"
                  style={{ display: 'inline-block', padding: '0.4rem 1rem', fontSize: '0.85rem' }}
                >
                  View Project
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ProjectModal 
        isOpen={!!selectedProject} 
        onClose={handleCloseModal} 
        project={selectedProject} 
      />
    </section>
  );
}
