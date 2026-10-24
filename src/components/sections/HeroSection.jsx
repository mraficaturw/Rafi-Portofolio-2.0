import './HeroSection.css';
import { personalData } from '../../data/portfolioData';
import ProfileCard from '../features/ProfileCard/ProfileCard';
import cvEN from '/assets/CV_M. Rafi Catur W_EN.pdf';
import cvID from '/assets/CV_M. Rafi Catur W.pdf';

export default function HeroSection({ isActive, onSelectSection }) {

  return (
    <section id="home" className={`spa-section ${isActive ? 'active-section' : ''}`}>
      <div className="hero-container">
        <div className="hero-content">
          <span className="badge-gray" style={{ display: "flex", maxWidth: "90px", gap: "0.3rem", alignItems: "center" }}><span className="hero-online-dot" />ONLINE</span>
          <h1 className="hero-title">{personalData.title}</h1>
          <p className="hero-description">{personalData.description}</p>
          <div className="addtional-information-wrapper">
            <p className="hero-addtional-information-wrapper"><span className="location-icon"></span> {personalData.location}</p>
            <p className="hero-addtional-information-wrapper"><span className="skill-level-icon"></span> {personalData.skillLevel}</p>
          </div>
          <div className="hero-actions-wrapper">
            <a href={cvID} download="CV_Rafi Catur_ID.pdf" className="btn-secondary btn-cv-override">
              📄 CV (ID)
            </a>
            <a href={cvEN} download="CV_Rafi Catur_EN.pdf" className="btn-secondary btn-cv-override">
              📄 CV (EN)
            </a>
          </div>
        </div>

        <div className="hero-media" style={{ height: '100%', width: '100%' }}>
          <ProfileCard
            name="M. Rafi Catur W."
            title="Fullstack Developer"
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
