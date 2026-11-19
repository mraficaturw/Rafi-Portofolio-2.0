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
          <div className="hero-status-row">
            <span className="badge-gray hero-status-badge">
              <span className="hero-online-dot" />
              AVAILABLE FOR HIRE
            </span>
            <span className="hero-location-tag">
              <span className="location-icon" /> {personalData.location}
            </span>
          </div>

          <h1 className="hero-title">
            Building Digital Experiences <span className="hero-title-highlight">Through Code.</span>
          </h1>

          <p className="hero-subtitle-role">
            {personalData.fullName} • <span className="hero-role-text">{personalData.title}</span>
          </p>

          <p className="hero-description">{personalData.description}</p>

          {/* Quick highlight stat badges
          <div className="hero-highlights">
            <div className="hero-highlight-pill">
              <span className="highlight-label">Degree</span>
              <span className="highlight-value">S.Kom (Informatics)</span>
            </div>
            <div className="hero-highlight-pill">
              <span className="highlight-label">Internship</span>
              <span className="highlight-value">PT IGP (Astra Otoparts)</span>
            </div>
            <div className="hero-highlight-pill">
              <span className="highlight-label">Leadership</span>
              <span className="highlight-value">Ex-Head Infokom HIMTIKA</span>
            </div>
          </div> */}

          {/* Actions & CTAs */}
          <div className="hero-actions-container">
            <div className="hero-primary-actions">
              <button
                type="button"
                onClick={() => onSelectSection('projects')}
                className="btn-primary hero-btn-cta"
              >
                Lihat Proyek →
              </button>
              <button
                type="button"
                onClick={() => onSelectSection('contact')}
                className="btn-secondary hero-btn-cta"
              >
                Hubungi Saya
              </button>
            </div>

            <div className="hero-cv-actions">
              <a href={cvID} download="CV_Rafi Catur_ID.pdf" className="btn-secondary btn-cv-override">
                📄 CV (ID)
              </a>
              <a href={cvEN} download="CV_Rafi Catur_EN.pdf" className="btn-secondary btn-cv-override">
                📄 CV (EN)
              </a>
            </div>
          </div>
        </div>

        <div className="hero-media">
          <ProfileCard
            name="M. Rafi Catur W."
            title={personalData.title}
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
