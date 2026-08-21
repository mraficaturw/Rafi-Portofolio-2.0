import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import "./ProjectModal.css";

const ProjectModal = ({ isOpen, onClose, project }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 400); // match animation duration
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    // Record the current scroll position to avoid jumping to top
    const scrollY = window.scrollY;
    const body = document.body;

    // Apply strict body-scroll lock styles
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.width = '100%';
    body.style.overflowY = 'hidden';

    return () => {
      // Remove styles
      body.style.position = '';
      body.style.top = '';
      body.style.width = '';
      body.style.overflowY = '';

      // Restore the scroll position accurately
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  if (!isOpen && !isClosing) return null;
  if (!project) return null;

  // Wrap the entire modal in a Portal so it attaches directly to document.body
  // This guarantees `position: fixed` relates to the browser viewport
  return createPortal(
    <div
      className={`pm-backdrop ${isClosing ? 'pm-closing' : ''}`}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div
        className={`pm-content ${isClosing ? 'pm-closing' : ''}`}
      >
        <div className="pm-top-gradient" />

        <button
          onClick={handleClose}
          className="pm-close-btn"
          aria-label="Close modal"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="pm-body modal-scrollbar">
          <div className="pm-header">
            <h2 className="pm-title">{project.title}</h2>
            <div className="pm-title-underline" />
          </div>

          <p className="pm-subtitle">
            {project.subtitle}
          </p>

          {project.tags && project.tags.length > 0 && (
            <div className="pm-tags">
              {project.tags.map((tag, idx) => (
                <span key={idx} className="pm-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <p className="pm-description">
            {project.fullDescription || project.description}
          </p>

          <div className="pm-actions">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="pm-btn pm-btn-primary"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
                <span>Live Demo</span>
              </a>
            )}

            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="pm-btn pm-btn-secondary"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.376.202 2.394.1 2.646.64.699 1.026 1.591 1.026 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"></path>
                </svg>
                <span>Source Code</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ProjectModal;
