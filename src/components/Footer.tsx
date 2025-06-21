import React, { useEffect, useRef } from 'react';
import { Code2, Github, Linkedin, Store } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const containerRef = useRef<HTMLDivElement>(null);

  // Slide‑up animation for mobile cards
  useEffect(() => {
    const cards = containerRef.current?.querySelectorAll('.mobile-card');
    cards?.forEach((card, i) => {
      card.animate(
        [{ transform: 'translateY(20px)', opacity: 0 }, { transform: 'translateY(0)', opacity: 1 }],
        {
          duration: 400,
          delay: i * 100,
          easing: 'ease-out',
          fill: 'forwards',
        }
      );
    });
  }, []);

  return (
    <footer className="bg-gray-800 border-t border-gray-700 text-gray-300">
      <div ref={containerRef} className="container mx-auto px-4 py-8">
        {/* Desktop: 3‑col; Mobile: stacked cards */}
        <div className="grid gap-4 md:grid-cols-3">
          
          {/* Brand Card */}
          <div className="mobile-card bg-gray-900 rounded-2xl p-4 md:bg-transparent md:p-0">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-7 h-7 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Code2 className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">Riyaz M</span>
            </div>
            <p className="text-sm leading-relaxed">
              Crafting digital experiences through code, design, and creativity.
              Always pushing the boundaries of what's possible.
            </p>
          </div>

          {/* Quick Links Card */}
          <div className="mobile-card bg-gray-900 rounded-2xl p-4 md:bg-transparent md:p-0">
            <h3 className="text-base font-semibold text-white mb-3">Quick Links</h3>
            <div className="space-y-1 text-sm">
              {['About', 'Projects', 'Skills', 'Contact'].map(label => (
                <a
                  key={label}
                  href={`#${label.toLowerCase()}`}
                  className="block hover:text-white transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Connect Card */}
          <div className="mobile-card bg-gray-900 rounded-2xl p-4 md:bg-transparent md:p-0">
            <h3 className="text-base font-semibold text-white mb-3">Let's Connect</h3>
            <p className="text-sm mb-3">
              Follow my journey and stay updated with my latest projects and insights.
            </p>
            <div className="flex space-x-3">
              {[
                { href: 'https://github.com/FantomAtom', Icon: Github, label: 'GitHub' },
                { href: 'https://www.linkedin.com/in/m-riyaz-dev/', Icon: Linkedin, label: 'LinkedIn' },
                { href: 'https://fantom-atom.itch.io/', Icon: Store, label: 'Itch.io' },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center
                             hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 hover:text-white
                             transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
