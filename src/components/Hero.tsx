import React, { useRef, useEffect } from 'react';
import { Github, Linkedin } from 'lucide-react';

const Hero: React.FC = () => {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const section = e.currentTarget;
    const overlay = overlayRef.current;
    if (!overlay) return;

    // Cancel any pending frame
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }

    const rect = section.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPct = (x / rect.width) * 100;
    const yPct = (y / rect.height) * 100;

    // On move, ensure overlay is visible
    overlay.style.opacity = '1';

    rafRef.current = requestAnimationFrame(() => {
      // Radial gradient: adjust color/opacity/radius as desired
      overlay.style.background = `radial-gradient(circle at ${xPct}% ${yPct}%, rgba(128,0,255,0.3) 0%, rgba(128,0,255,0) 70%)`;
      rafRef.current = null;
    });
  };

  const handleMouseLeave = () => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    // Fade out by setting opacity to 0; background remains so fade shows the last light
    overlay.style.opacity = '0';
    // We do not clear background here; letting opacity transition handle the fade-out.
  };

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const imageUrl =
    'https://static.vecteezy.com/system/resources/previews/024/344/077/non_2x/businessman-isolated-illustration-ai-generative-free-png.png';

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Overlay for the mouse-follow radial light */}
      <div
        ref={overlayRef}
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
        style={{ opacity: 0 }}
      />

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <img
              src="/favIcon.png"
              alt="Portfolio Logo"
              className="mx-auto mb-6 w-36 h-36 object-contain"
            />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Full-Stack Developer
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            Crafting innovative apps, fun games and digital experiences that challenge norms and spark imagination.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              onClick={scrollToProjects}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              View My Work
            </button>
          </div>

          <div className="flex items-center justify-center space-x-6">
            <a
              href="https://github.com/FantomAtom"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/m-riyaz-dev/"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
