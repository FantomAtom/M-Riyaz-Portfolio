import React, { useState, useRef, useEffect, MouseEvent } from 'react';
import {
  ExternalLink,
  Github,
  Gamepad2,
  Smartphone,
  Wrench,
  Filter,
} from 'lucide-react';

import talim from '../assets/images/talim.png';

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  category: 'game' | 'app' | 'other';
  image: string;
  technologies: string[];
  // For Talim, we use these instead of github/live demo:
  viewMoreUrl?: string;
  playstoreUrl?: string;
  // Keep legacy fields optional if you have other projects using them
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Talim',
    description: 'Discover Islamic knowledge at your own pace with Talim – an interactive app featuring lessons on Islam. Learn anytime, anywhere, and deepen your connection to Islam.',
    longDescription:
      'Talim is an interactive app designed to simplify Islamic learning. With lessons on the Quran, Prophets’ biographies, and Hadith, the app offers a user-friendly experience for learners of all levels. Features include personalized progress tracking, quizzes, badges, and leaderboards to keep you motivated. Accessible on all devices, Talim makes learning about Islam easy, engaging, and flexible.',
    category: 'app',
    image: talim, // use imported image
    technologies: ['Unity', 'C#', 'AWS DynamoDB', 'AWS Lambda'], // adjust as appropriate
    viewMoreUrl: 'https://akhlaqventures.com/products/talim',
    playstoreUrl: 'https://play.google.com/store/apps/details?id=com.AkhlaqVentures.talim',
    featured: true,
  },
  {
    id: 2,
    title: 'TaskFlow Mobile App',
    description: 'A productivity app with smart scheduling and team collaboration features.',
    longDescription:
      'A comprehensive productivity application that helps teams manage tasks, deadlines, and collaborative projects. Features real-time synchronization, smart notifications, and intuitive design.',
    category: 'app',
    image:
      'https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=600',
    technologies: ['React Native', 'Node.js', 'MongoDB', 'Socket.io'],
    githubUrl: '#',
    liveUrl: '#',
    featured: true,
  },
  {
    id: 3,
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with modern UI and payment integration.',
    longDescription:
      'A complete e-commerce platform with user authentication, product management, shopping cart, payment processing, and admin dashboard. Built with modern technologies for scalability and performance.',
    category: 'app',
    image:
      'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600',
    technologies: ['React', 'TypeScript', 'Stripe', 'PostgreSQL'],
    githubUrl: '#',
    liveUrl: '#',
    featured: false,
  },
  {
    id: 4,
    title: 'Space Shooter Arcade',
    description: 'Fast-paced arcade shooter with procedural levels and power-ups.',
    longDescription:
      'An intense arcade-style space shooter featuring procedurally generated levels, upgrade systems, boss battles, and leaderboards. Optimized for both desktop and mobile platforms.',
    category: 'game',
    image:
      'https://images.pexels.com/photos/586055/pexels-photo-586055.jpeg?auto=compress&cs=tinysrgb&w=600',
    technologies: ['Unity', 'C#', 'WebGL', 'Firebase'],
    githubUrl: '#',
    liveUrl: '#',
    featured: false,
  },
  {
    id: 5,
    title: 'AI Art Generator',
    description: 'Creative tool that generates artwork using machine learning algorithms.',
    longDescription:
      'An innovative application that uses machine learning to generate unique artworks based on user inputs and style preferences. Features style transfer, custom prompts, and gallery sharing.',
    category: 'other',
    image:
      'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600',
    technologies: ['Python', 'TensorFlow', 'Flask', 'React'],
    githubUrl: '#',
    liveUrl: '#',
    featured: true,
  },
  {
    id: 6,
    title: 'Weather Dashboard',
    description: 'Beautiful weather app with detailed forecasts and interactive maps.',
    longDescription:
      'A comprehensive weather application providing detailed forecasts, interactive weather maps, alerts, and personalized recommendations. Features clean design and smooth animations.',
    category: 'app',
    image:
      'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=600',
    technologies: ['Vue.js', 'Weather API', 'Chart.js', 'Tailwind'],
    githubUrl: '#',
    liveUrl: '#',
    featured: false,
  },
];

const categories = [
  { id: 'all', label: 'All Projects', icon: <Filter className="w-4 h-4" /> },
  { id: 'game', label: 'Games', icon: <Gamepad2 className="w-4 h-4" /> },
  { id: 'app', label: 'Apps', icon: <Smartphone className="w-4 h-4" /> },
  { id: 'other', label: 'Other', icon: <Wrench className="w-4 h-4" /> },
];

type ModalProps = {
  project: Project;
  onClose: () => void;
};

const ProjectModal: React.FC<ModalProps> = ({ project, onClose }) => {
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  const close = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === backdropRef.current) {
      close();
    }
  };

  return (
    <div
      ref={backdropRef}
      className={`fixed inset-0 bg-black/70 flex items-center justify-center z-50 transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleBackdropClick}
    >
      <div
        className={`bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 ${
          visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <div className="relative">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-64 object-cover rounded-t-2xl"
          />
          <button
            onClick={close}
            className="absolute top-4 right-4 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          >
            ×
          </button>
        </div>
        <div className="p-8">
          <h3 className="text-3xl font-bold text-white mb-4">{project.title}</h3>
          <p className="text-gray-300 text-lg mb-6 leading-relaxed">
            {project.longDescription}
          </p>
          <div className="flex flex-wrap gap-3 mb-6">
            {project.technologies.map((tech) => (
              <span key={tech} className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full">
                {tech}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            {/* Talim: show View More and Playstore if URLs exist */}
            {project.viewMoreUrl && (
              <a
                href={project.viewMoreUrl}
                className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-5 h-5" />
                <span>View More</span>
              </a>
            )}
            {project.playstoreUrl && (
              <a
                href={project.playstoreUrl}
                className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Smartphone className="w-5 h-5" />
                <span>Playstore</span>
              </a>
            )}
            {/* For other projects that might have github/liveUrl: */}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                className="flex items-center space-x-2 bg-gray-700 text-white px-6 py-3 rounded-full hover:bg-gray-600 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-5 h-5" />
                <span>View Code</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-5 h-5" />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectCard: React.FC<{
  project: Project;
  onClick: () => void;
}> = ({ project, onClick }) => {
  return (
    <div onClick={onClick} className="cursor-pointer group">
      <div className="rounded-xl p-px bg-gradient-to-r from-purple-500 to-blue-500 group-hover:scale-105 transform transition-all duration-300">
        <div className="bg-gray-800 rounded-xl overflow-hidden">
          <div className="relative overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xl font-semibold text-white">{project.title}</h4>
              {project.featured && (
                <span className="px-2 py-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs rounded-full">
                  Featured
                </span>
              )}
            </div>
            <p className="text-gray-300 mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex items-center space-x-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  className="text-gray-400 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github className="w-5 h-5" />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  className="text-gray-400 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'game' | 'app' | 'other'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  // Background overlay effect
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const section = e.currentTarget;
    const overlay = overlayRef.current;
    if (!overlay) return;
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }
    const rect = section.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPct = (x / rect.width) * 100;
    const yPct = (y / rect.height) * 100;

    overlay.style.opacity = '1';

    rafRef.current = requestAnimationFrame(() => {
      overlay.style.background = `radial-gradient(circle at ${xPct}% ${yPct}%, rgba(255,165,0,0.25) 0%, rgba(255,165,0,0) 70%)`;
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
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  const featuredProjects = projects.filter((project) => project.featured);

  const featuredRef = useRef<HTMLDivElement | null>(null);
  const scrollFeatured = (direction: 'left' | 'right') => {
    if (!featuredRef.current) return;
    const container = featuredRef.current;
    const scrollAmount = container.clientWidth * 0.7;
    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="projects"
      className="relative py-20 bg-gray-900 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
        style={{ opacity: 0 }}
      />

      {/* Main content (no blur) */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">My Projects</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A collection of games, applications, and creative projects that showcase my passion
            for development and innovation.
          </p>
        </div>

        {/* Featured Work */}
        {featuredProjects.length > 0 && (
          <div className="mb-16">
            <div className="relative bg-gradient-to-r from-purple-800 to-blue-800 rounded-2xl py-12 px-4 md:px-8 overflow-hidden">
              {/* Animated blobs */}
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-700 opacity-20 rounded-full animate-blob"></div>
              <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-blue-700 opacity-20 rounded-full animate-blob animation-delay-2000"></div>

              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center relative z-10">
                Featured Work
              </h3>
              <div className="relative">
                <div className="flex flex-wrap justify-center gap-6">
                  {featuredProjects.slice(0, 3).map((project) => (
                    <div
                      key={project.id}
                      className="w-full sm:w-80 lg:w-96 mx-auto"
                      onClick={() => setSelectedProject(project)}
                    >
                      <div className="relative group cursor-pointer rounded-xl overflow-hidden shadow-2xl">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-48 md:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                          <h4 className="text-lg md:text-xl font-semibold text-white">
                            {project.title}
                          </h4>
                          <p className="text-gray-300 text-sm mt-1 line-clamp-2">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {project.technologies.slice(0, 3).map((tech) => (
                              <span
                                key={tech}
                                className="px-2 py-1 bg-purple-600/70 text-xs text-white rounded"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                          {project.featured && (
                            <span className="absolute top-3 right-3 px-2 py-1 bg-yellow-400 text-black text-xs font-semibold rounded-full">
                              Featured
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id as any)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {category.icon}
              <span>{category.label}</span>
            </button>
          ))}
        </div>

        {/* All Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
};

export default Projects;
