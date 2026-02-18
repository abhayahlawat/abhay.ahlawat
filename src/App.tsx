import { useState, useEffect, useCallback } from 'react';
import Lenis from 'lenis';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import Hero from './sections/Hero';
import StoryStrip from './sections/StoryStrip';
import ProjectsPinned from './sections/ProjectsPinned';
import Services from './sections/Services';
import Highlights from './sections/Highlights';
import Process from './sections/Process';
import Contact from './sections/Contact';
import Experience from './sections/Experience';
import FlowingMenu from './components/ui/FlowingMenu';
import ChapterIndicator from './components/ui/ChapterIndicator';
import WelcomeScreen from './components/WelcomeScreen';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  const handleWelcomeComplete = useCallback(() => {
    setShowWelcome(false);
  }, []);

  useEffect(() => {
    if (showWelcome) return; // Don't init Lenis until welcome finishes

    const lenis = new Lenis();

    lenis.on('scroll', ScrollTrigger.update);

    function update(time: number) {
      lenis.raf(time * 1000);
    }

    gsap.ticker.add(update);

    gsap.ticker.lagSmoothing(0);

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor && anchor.hash && anchor.hash.startsWith('#')) {
        e.preventDefault();
        const id = anchor.hash;
        const element = document.querySelector(id);
        if (element) {
          lenis.scrollTo(element);
          setIsMenuOpen(false);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
      document.removeEventListener('click', handleAnchorClick);
    };
  }, [showWelcome]);

  return (
    <main className="antialiased bg-white text-black selection:bg-black selection:text-white relative">
      {showWelcome && <WelcomeScreen onComplete={handleWelcomeComplete} />}

      {!showWelcome && (
        <>
          <ChapterIndicator />
          <Header onMenuClick={() => setIsMenuOpen(!isMenuOpen)} isOpen={isMenuOpen} />
        </>
      )}

      {/* FlowingMenu Overlay */}
      <div className={`fixed inset-0 z-40 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <FlowingMenu
          items={[
            { link: '#hero', text: 'The Spark', image: 'https://images.unsplash.com/photo-1519638399535-1b036603ac77?q=80&w=600&auto=format&fit=crop' },
            { link: '#story', text: 'Philosophy', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=600&auto=format&fit=crop' },
            { link: '#work', text: 'Creation', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop' },
            { link: '#services', text: 'Capabilities', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop' },
            { link: '#experience', text: 'The Journey', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop' },
            { link: '#process', text: 'Method', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop' },
            { link: '#highlights', text: 'Playground', image: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=600&auto=format&fit=crop' },
            { link: '#contact', text: 'Connection', image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=600&auto=format&fit=crop' }
          ]}
          speed={15}
          textColor="#ffffff"
          bgColor="#09090b" // Zinc-950
          marqueeTextColor="#000000"
          borderColor="#27272a" // Zinc-800
          onItemClick={() => setIsMenuOpen(false)}
        />
      </div>
      <Hero />
      <StoryStrip />
      <ProjectsPinned />
      <Services />
      <Experience />
      <Process />
      <Highlights />
      <Contact />
      <Footer />
    </main>
  );
}

export default App;
