import './HeroSection.css';
import { personalData } from '../../data/portfolioData';
import ProfileCard from '../features/ProfileCard/ProfileCard';
import cvEN from '/assets/CV_M_Rafi_Catur_W_EN.pdf';
import cvID from '/assets/CV_M_Rafi_Catur_W.pdf';

export default function HeroSection({ isActive, onSelectSection }) {

  return (
    <section id="home" className={`spa-section ${isActive ? 'active-section' : ''}`}>
      <div className="hero-container">
        <div className="hero-content">
          <span className="badge-gray" style={{ display: "flex", maxWidth: "90px", gap: "0.3rem", alignItems: "center" }}><span className="hero-online-dot" />{personalData.badge}</span>
          <h1 className="hero-title">{personalData.title}</h1>
          <p className="hero-description">{personalData.description}</p>
          <div className="hero-actions-wrapper">
            <div className="hero-actions-grid">
              <button
                type="button"
                className="btn-primary"
                onClick={() => onSelectSection('contact')}
              >
                Contact me
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => onSelectSection('projects')}
              >
                Projects
              </button>
              <a href={cvEN} download="CV_Rafi Catur_EN.pdf" className="btn-secondary btn-cv-override">
                📄 CV (EN)
              </a>
              <a href={cvID} download="CV_Rafi Catur_ID.pdf" className="btn-secondary btn-cv-override">
                📄 CV (ID)
              </a>
            </div>
          </div>
        </div>

        <div className="hero-media" style={{ height: '100%', width: '100%' }}>
          <ProfileCard
            name="M. Rafi Catur W."
            title="Web Developer"
            handle="mraficw"
            status="Online"
            contactText="Contact Me"
            avatarUrl="/assets/profile.png"
            showUserInfo={true}
            enableTilt={true}
            enableMobileTilt={false}
            onContactClick={() => onSelectSection('contact')}
          />
        </div>
      </div>
    </section>
  );
}
