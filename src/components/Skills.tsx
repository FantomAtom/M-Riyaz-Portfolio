import React, { useRef, useEffect, useState } from 'react';
import {
  Gamepad2,
  Smartphone,
  Database,
  Cloud,
  ClipboardList,
  GitBranch,
  Palette,
  Users,
} from 'lucide-react';

const skillCategories = [
  {
    title: "Game & Interactive Development",
    icon: <Gamepad2 className="w-6 h-6 text-white" />,
    skills: [
      "Unity & C#",
      "VR Prototyping",
      "Game Jam Workflows",
      "Rapid Prototyping",
      "Gameplay Mechanics",
    ],
  },
  {
    title: "App & Web Projects",
    icon: <Smartphone className="w-6 h-6 text-white" />,
    skills: [
      "React Native",
      "Firebase Integration",
      "Android Studio Setup",
      "Responsive UI Patterns",
      "API Integration",
    ],
  },
  {
    title: "Backend Development",
    icon: <Database className="w-6 h-6 text-white" />,
    skills: [
      "Firestore & Auth",
      "Serverless Functions",
      "Database Design",
      "Real-time Data",
      "REST API Concepts",
    ],
  },
  {
    title: "Cloud Services",
    icon: <Cloud className="w-6 h-6 text-white" />,
    skills: [
      "AWS DynamoDB",
      "AWS Lambda",
      "API Gateway",
      "CloudWatch Monitoring",
      "S3 & Translate",
    ],
  },
  {
    title: "Project Management & Collaboration",
    icon: <ClipboardList className="w-6 h-6 text-white" />,
    skills: [
      "Agile/Scrum with Jira",
      "Trello & Confluence",
      "Time Management",
      "Team Coordination",
      "Task Prioritization",
    ],
  },
  {
    title: "Version Control & Deployment",
    icon: <GitBranch className="w-6 h-6 text-white" />,
    skills: [
      "Git, GitHub & Bitbucket",
      "Branching Strategies",
      "Pull Requests & Code Reviews",
      "CI/CD Pipelines",
      "Automated Builds",
    ],
  },
  {
    title: "Creative & Multimedia",
    icon: <Palette className="w-6 h-6 text-white" />,
    skills: [
      "Blender Modeling",
      "Premiere Pro Editing",
      "After Effects Basics",
      "Audio Editing (FL Studio/Audacity)",
      "UI/UX Mockups",
    ],
  },
  {
    title: "Soft Skills & Communication",
    icon: <Users className="w-6 h-6 text-white" />,
    skills: [
      "English & Tamil Fluency",
      "Clear Technical Writing",
      "Devlog & Video Presentations",
      "Team Leadership",
      "Client Collaboration",
    ],
  },
];

const Skills: React.FC = () => {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [shining, setShining] = useState<boolean[]>(() =>
    skillCategories.map(() => false)
  );

  const toggle = (i: number) => {
    setOpenIdx(prev => (prev === i ? null : i));
    setShining(prev => {
      const next = [...prev];
      next[i] = true;
      return next;
    });
  };

  const handleAnimationEnd = (idx: number) => {
    setShining(prev => {
      const next = [...prev];
      next[idx] = false;
      return next;
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = ((e.clientX - rect.left) / rect.width) * 100;
    const yPct = ((e.clientY - rect.top) / rect.height) * 100;

    overlay.style.opacity = '1';
    rafRef.current = requestAnimationFrame(() => {
      overlay.style.background = `radial-gradient(circle at ${xPct}% ${yPct}%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 80%)`;
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
      <div className="absolute -top-16 -left-16 w-48 h-48 bg-purple-600 opacity-20 rounded-full animate-blob" />
      <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-blue-600 opacity-20 rounded-full animate-blob animation-delay-2000" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Skills & Technologies
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            These are areas I’ve worked in so far. I adapt and learn new approaches <br />
            as each project requires.
          </p>
          <p className="text-gray-400 mt-2">
            Always open to picking up new methods and tools when they add value.
          </p>
        </div>

        {/* Mobile: Accordion */}
        <div className="md:hidden space-y-4">
          {skillCategories.map((cat, i) => (
            <div
              key={i}
              className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg relative"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between p-6"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mr-4">
                    {cat.icon}
                  </div>
                  <h3 className="text-base font-semibold text-white">
                    {cat.title}
                  </h3>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`w-6 h-6 text-gray-300 transition-transform ${
                    openIdx === i ? 'rotate-45' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </button>

              <div
                className={`px-6 ${
                  openIdx === i ? 'pb-4 max-h-40' : 'pb-0 max-h-0'
                } transition-[max-height] duration-500 ease-in-out overflow-hidden`}
                onAnimationEnd={() => handleAnimationEnd(i)}
              >
                {shining[i] && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div
                      className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shine"
                      style={{ transform: 'translateX(-100%)' }}
                    />
                  </div>
                )}
                <div className="space-y-2">
                  {cat.skills.map((s, si) => (
                    <div key={si} className="flex items-center">
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mr-3" />
                      <span className="text-gray-300">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop & Tablet: Original Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((cat, i) => (
            <div
              key={i}
              className="relative bg-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 duration-300 overflow-hidden"
              onClick={() =>
                setShining(prev => {
                  const next = [...prev];
                  next[i] = true;
                  return next;
                })
              }
              onAnimationEnd={() => handleAnimationEnd(i)}
            >
              {shining[i] && (
                <div className="absolute inset-0 pointer-events-none">
                  <div
                    className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shine"
                    style={{ transform: 'translateX(-100%)' }}
                  />
                </div>
              )}
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mr-4">
                  {cat.icon}
                </div>
                <h3 className="text-2xl font-semibold text-white">{cat.title}</h3>
              </div>
              <div className="space-y-3">
                {cat.skills.map((s, si) => (
                  <div key={si} className="flex items-center">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mr-3" />
                    <span className="text-gray-300">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Learning in Practice */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl p-8 md:p-12">
            <h3 className="text-3xl font-bold text-white mb-6">
              Learning in Practice
            </h3>
            <p className="text-gray-300 text-lg mb-8 max-w-3xl mx-auto leading-relaxed">
              I adapt to project demands by learning new methods and workflows to keep my work practical and up to date.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                'Agile Workflows',
                'Code Reviews',
                'Rapid Prototyping',
                'Cross-functional Teams',
                'Automated Testing',
              ].map(label => (
                <span
                  key={label}
                  className="px-4 py-2 bg-gray-700 text-gray-300 rounded-full text-sm relative overflow-hidden group transition-all duration-300"
                >
                  <span className="relative z-10">{label}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
