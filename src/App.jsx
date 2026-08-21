import { useState } from 'react';
import Preloader from './components/ui/preloader';
import PersistentBackground from './components/layout/PersistentBackground';
import Navbar from './components/layout/Navbar';
import HeroSection from './components/sections/HeroSection';
import ToolsSection from './components/sections/ToolsSection';
import ProjectsSection from './components/sections/ProjectsSection';
import ExperienceSection from './components/sections/ExperienceSection';
import ContactSection from './components/sections/ContactSection';
import Footer from './components/layout/Footer';
import { VALID_SECTIONS } from './constants';

function getInitialSection() {
  const hash = window.location.hash.replace('#', '');
  return (hash && VALID_SECTIONS.includes(hash)) ? hash : 'home';
}

export default function App() {
  const [activeSection, setActiveSection] = useState(getInitialSection);
  const [isLoading, setIsLoading] = useState(true);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  const handleSelectSection = (sectionId) => {
    setActiveSection(sectionId);
    if (window.history.pushState) {
      window.history.pushState(null, '', `#${sectionId}`);
    } else {
      window.location.hash = `#${sectionId}`;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      <PersistentBackground />
      <Navbar activeSection={activeSection} onSelectSection={handleSelectSection} />

      <main className="content-area">
        <HeroSection isActive={activeSection === 'home'} onSelectSection={handleSelectSection} />
        <ToolsSection isActive={activeSection === 'tools'} />
        <ProjectsSection isActive={activeSection === 'projects'} />
        <ExperienceSection isActive={activeSection === 'experience'} />
        <ContactSection isActive={activeSection === 'contact'} />
      </main>

      <Footer />
    </>
  );
}
