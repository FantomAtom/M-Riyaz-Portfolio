import React, { useRef, useEffect } from 'react';
import { Code, Gamepad2, Palette, Zap } from 'lucide-react';

type Highlight = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const highlights: Highlight[] = [
  {
    icon: <Gamepad2 className="w-6 h-6" />,
    title: 'Game Development',
    description: 'Creating engaging and immersive gaming experiences with modern engines and frameworks.',
  },
  {
    icon: <Code className="w-6 h-6" />,
    title: 'App Development',
    description: 'Building responsive web and mobile applications with cutting-edge technologies.',
  },
  {
    icon: <Palette className="w-6 h-6" />,
    title: 'Creative Design',
    description: 'Designing beautiful user interfaces and experiences that delight users.',
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Innovation',
    description: "Always exploring new technologies and pushing the boundaries of what's possible.",
  },
];

// Tilt-on-hover card component
const TiltCard: React.FC<{ highlight: Highlight }> = ({ highlight }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;

    // cancel previous frame
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = (x / rect.width) * 2 - 1; // -1 to 1
    const py = (y / rect.height) * 2 - 1; // -1 to 1

    // limit rotation angles
    const rotateMax = 8; // degrees
    const rotY = px * rotateMax; // tilt left/right
    const rotX = -py * rotateMax; // tilt up/down

    rafRef.current = requestAnimationFrame(() => {
      if (el) {
        el.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02,1.02,1.02)`;
      }
      rafRef.current = null;
    });
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (el) {
      // reset transform smoothly
      el.style.transition = 'transform 0.3s ease';
      el.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
      // remove transition after it ends so further moves aren’t delayed
      const cleanup = () => {
        if (el) {
          el.style.transition = '';
        }
        el.removeEventListener('transitionend', cleanup);
      };
      el.addEventListener('transitionend', cleanup);
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-gray-900 p-6 rounded-xl cursor-pointer"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
        {highlight.icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-3">{highlight.title}</h3>
      <p className="text-gray-300 leading-relaxed">{highlight.description}</p>
    </div>
  );
};

const About: React.FC = () => {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const section = e.currentTarget;
    const overlay = overlayRef.current;
    if (!overlay) return;
    // cancel pending frame
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }

    const rect = section.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPct = (x / rect.width) * 100;
    const yPct = (y / rect.height) * 100;

    // ensure visible
    overlay.style.opacity = '1';

    rafRef.current = requestAnimationFrame(() => {
      // teal-ish radial light
      overlay.style.background = `radial-gradient(circle at ${xPct}% ${yPct}%, rgba(0,200,200,0.25) 0%, rgba(0,200,200,0) 70%)`;
      rafRef.current = null;
    });
  };

  const handleMouseLeave = () => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    // fade out linger
    overlay.style.opacity = '0';
    // keep background so fade shows last position before fully transparent
  };

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <section
      id="about"
      className="relative py-20 bg-gray-800 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Overlay for radial light */}
      <div
        ref={overlayRef}
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
        style={{ opacity: 0 }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">About Me</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            I'm a passionate developer who loves creating digital experiences that make a difference. 
            With expertise spanning game development, web applications, and creative technology, 
            I bring ideas to life through code and design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {highlights.map((h, idx) => (
            <TiltCard key={idx} highlight={h} />
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold text-white mb-6">
                Let's Build Something Amazing Together
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Whether you're looking for a game that captivates players, an app that solves real problems, 
                or a creative solution that stands out from the crowd, I'm here to bring your vision to life.
              </p>
              <div className="flex flex-wrap gap-3">
                {['React', 'Unity', 'TypeScript', 'Node.js', 'Python', 'C#'].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-center lg:text-right">
              <div className="inline-block p-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl">
                <div className="w-48 h-48 bg-gray-800 rounded-xl flex items-center justify-center">
                  <span className="text-6xl">🚀</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
