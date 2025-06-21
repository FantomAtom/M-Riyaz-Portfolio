import React, { useRef, useEffect, useState } from 'react';
import { Code, Database, Gamepad2, Palette, Globe, Smartphone } from 'lucide-react';

const skillCategories = [
  {
    title: "Frontend Development",
    icon: <Code className="w-6 h-6 text-white" />,
    skills: ["React", "TypeScript", "Vue.js", "Tailwind CSS", "Next.js", "HTML5/CSS3"]
  },
  {
    title: "Game Development",
    icon: <Gamepad2 className="w-6 h-6 text-white" />,
    skills: ["Unity", "C#", "Unreal Engine", "Godot", "WebGL", "Game Design"]
  },
  {
    title: "Backend Development",
    icon: <Database className="w-6 h-6 text-white" />,
    skills: ["Node.js", "Python", "PostgreSQL", "MongoDB", "Firebase", "REST APIs"]
  },
  {
    title: "Mobile Development",
    icon: <Smartphone className="w-6 h-6 text-white" />,
    skills: ["React Native", "Flutter", "iOS", "Android", "Expo", "PWA"]
  },
  {
    title: "Design & UI/UX",
    icon: <Palette className="w-6 h-6 text-white" />,
    skills: ["Figma", "Adobe Creative Suite", "Blender", "UI Design", "Prototyping", "3D Modeling"]
  },
  {
    title: "Web Technologies",
    icon: <Globe className="w-6 h-6 text-white" />,
    skills: ["WebGL", "Three.js", "Canvas API", "WebRTC", "GraphQL", "Socket.io"]
  }
];

const Skills: React.FC = () => {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  // track shining state per card index
  const [shining, setShining] = useState<boolean[]>(() =>
    skillCategories.map(() => false)
  );

  const handleCardClick = (idx: number) => {
    // trigger shine
    setShining(prev => {
      const next = [...prev];
      next[idx] = true;
      return next;
    });
  };

  const handleAnimationEnd = (idx: number) => {
    // reset after animation
    setShining(prev => {
      const next = [...prev];
      next[idx] = false;
      return next;
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const section = e.currentTarget;
    const overlay = overlayRef.current;
    if (!overlay) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const rect = section.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPct = (x / rect.width) * 100;
    const yPct = (y / rect.height) * 100;

    overlay.style.opacity = '1';
    rafRef.current = requestAnimationFrame(() => {
      overlay.style.background =
        `radial-gradient(circle at ${xPct}% ${yPct}%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 80%)`;
      rafRef.current = null;
    });
  };

  const handleMouseLeave = () => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    overlay.style.opacity = '0';
  };

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      id="skills"
      className="relative py-20 bg-gray-800 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Light ripple overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{ opacity: 0 }}
      />

      {/* Animated blobs */}
      <div className="absolute -top-16 -left-16 w-48 h-48 bg-purple-600 opacity-20 rounded-full animate-blob"></div>
      <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-blue-600 opacity-20 rounded-full animate-blob animation-delay-2000"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Skills & Technologies
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            These are tools I’ve used so far. I keep exploring new ones as needed for each project,<br/>
            constantly evolving with the latest industry standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, idx) => (
            <div
              key={idx}
              className="relative bg-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 duration-300 overflow-hidden"
              onClick={() => handleCardClick(idx)}
            >
              {/* Shine overlay */}
              {shining[idx] && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  onAnimationEnd={() => handleAnimationEnd(idx)}
                >
                  <div
                    className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shine"
                    style={{ transform: 'translateX(-100%)' }}
                  />
                </div>
              )}

              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mr-4">
                  {category.icon}
                </div>
                <h3 className="text-2xl font-semibold text-white">
                  {category.title}
                </h3>
              </div>
              <div className="space-y-3">
                {category.skills.map((skill, sidx) => (
                  <div key={sidx} className="flex items-center">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mr-3"></div>
                    <span className="text-gray-300">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl p-8 md:p-12">
            <h3 className="text-3xl font-bold text-white mb-6">
              Learning in Practice
            </h3>
            <p className="text-gray-300 text-lg mb-8 max-w-3xl mx-auto leading-relaxed">
              I adapt to project demands by learning new methods and workflows to keep my work practical and up to date.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {['Unity','C#','React Native','Firebase','DevOps','AWS','CI/CD',].map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-gray-700 text-gray-300 rounded-full text-sm relative overflow-hidden group transition-all duration-300"
                >
                  <span className="relative z-10">{tech}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
