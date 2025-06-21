import React, { useState, useRef, useEffect, MouseEvent } from 'react';
import {
  ExternalLink,
  Github,
  Gamepad2,
  Smartphone,
  Wrench,
  Filter,
  Store,
} from 'lucide-react';

import talim from '../assets/images/talim.png';
import busbeat from '../assets/images/busbeat.svg';
import lightmaker from '../assets/images/lightmaker.png';
import skillshot from '../assets/images/skillshot.png';
import knockmaniac from '../assets/images/knockmaniac.png';

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  category: 'game' | 'app' | 'other';
  image: string;
  technologies: string[];
  // For Other projects, we use these instead of github/live demo:
  viewMoreUrl?: string;
  playstoreUrl?: string;
  viewOnItch?: string;
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
    category: 'game',
    image: talim, // use imported image
    technologies: ['Unity', 'C#', 'AWS DynamoDB', 'AWS Lambda'], // adjust as appropriate
    viewMoreUrl: 'https://akhlaqventures.com/products/talim',
    playstoreUrl: 'https://play.google.com/store/apps/details?id=com.AkhlaqVentures.talim',
    featured: true,
  },
  {
    id: 2,
    title: 'BusBeat - Your Friendly Bus Mate',
    description:
      'Track your bus in real-time with BusBeat! Enhance your commute with live updates, safety features, and seamless driver management.',
    longDescription:
      "BusBeat is a smart solution for bus travel, offering live tracking, safety alerts, feedback options, and driver management—all without requiring GPS installation. It's an affordable, efficient way to improve the commuting experience, providing real-time updates and enhanced security for passengers.",
    category: 'app',
    image: busbeat,
    technologies: [
      // adjust or list actual tech stack if known; placeholders below:
      'React Native',
      'Tailwind CSS',
      'AWS DynamoDB',
      'AWS Lambda',
    ],
    viewMoreUrl: 'https://busbeat.com',
    playstoreUrl:
      'https://play.google.com/store/apps/details?id=com.akhlaqventures.busbeat',
    featured: true,
  },
  {
    id: 3,
    title: 'Light Maker',
    description: 'Face your fears in Light Maker—a surreal adventure where you wield the power of light to battle nightmares and explore a haunting dream world.',
    longDescription:
      'Light Maker is an atmospheric action-adventure game where you play as a frightened child navigating through a dark, dreamlike world. Guided by a sentient light companion, you\'ll collect magical shards to upgrade your light powers, combat ghostly foes, and illuminate the path through your deepest fears.',
    category: 'game',
    image: lightmaker,
    technologies: ['Unity', 'C#', 'FMOD', 'Blender'],
    viewOnItch: 'https://fantom-atom.itch.io/light-maker',
    featured: true,
  },
  {
    id: 4,
    title: 'Skill-Shot VR',
    description: 'Enter the world of Skill Shot VR—a fast-paced prototype where precision, timing, and creative weapons define your virtual shooting skills.',
    longDescription:
      'Skill Shot VR is a personal prototype project built to explore VR game development. Set in an immersive environment, the game challenges players to complete skill-based shooting trials using guns, swords, and throwable bombs. Designed as a learning experiment, the focus is on accuracy, interaction, and real-time feedback in a VR setting.',
    category: 'game',
    image:skillshot,
    technologies: ['Unity', 'C#', 'Meta Quest 3'],
    viewMoreUrl: 'https://side.quest/app/37706/skillshot-vr',
    viewOnItch: 'https://fantom-atom.itch.io/skill-shot-vr',
    featured: false,
  },
  {
    id: 5,
    title: 'Dish Dash! - Food Delivery App',
    description: 'Dish Dash! is a React Native food-ordering prototype with delivery and pickup options, powered by Firebase for real-time data and secure user authentication.',
    longDescription:
      'Dish Dash! is a learning project built in React Native that lets users browse menus, place orders for delivery or pickup, and manage their account via Firebase Authentication. It uses Firestore for storing menu items and orders, Firebase Storage for images, and demonstrates real-time updates and basic order flow. Designed as a prototype, it showcases integration of core Firebase services and mobile UI patterns for a seamless ordering experience.',
    category: 'app',
    image:
      'https://media.istockphoto.com/id/1394533352/vector/male-food-delivery-man-in-yellow-uniform-sits-on-scooter-or-motorcycle-with-a-box.jpg?s=612x612&w=0&k=20&c=XkfEONMbcZVa_y9uJ6wR1oPmk2BqdkFinuY5yr8tkTA=',
    technologies: ['React Native', 'JavaScript', 'Firebase Authentication', 'Firebase Storage'],
    githubUrl: 'https://github.com/FantomAtom/Dish-Dash',
    featured: false,
  },
  {
    id: 6,
    title: 'Knock Maniac',
    description: 'Tap your way to mastery in Door Knock Maniac—a fast-paced clicking game where every knock counts and the challenge ramps up with each beat.',
    longDescription:
      'Door Knock Maniac is a casual, browser-friendly game created as a fun YouTube project. Players click on circles that appear on a door before they vanish, managing a noise meter that tracks how loud each knock is, and building combos for bonus points. As time progresses, the spawn rate accelerates, testing reflexes and timing in an addictive loop.',
    category: 'game',
    image:
      'https://img.itch.zone/aW1hZ2UvMzI5ODg0OS8xOTY5ODU2Ni5wbmc=/original/8e9AVH.png',
    technologies: ['Unity', 'C#', 'Photoshop'],
    viewOnItch: 'https://fantom-atom.itch.io/knock-maniac',
    featured: false,
  },
  {
    id: 7,
    title: 'Timeless',
    description: 'Race against time in Timeless, a fast-paced pixel-art puzzle game where failure rewinds your progress and precision is your only way forward.',
    longDescription:
      'Timeless is a 2D top-down puzzle game created in just a week for Brackeys Game Jam 2020.2, developed by a team of three. You play as an explorer navigating mysterious rooms, solving spatial puzzles under intense time pressure. If the timer hits zero, time reverses—and you are sent back to where you started in that level. With a twist on classic puzzle mechanics and a stylish retro aesthetic, Timeless offers a unique and engaging gameplay experience.',
    category: 'game',
    image:
      'https://img.itch.zone/aW1hZ2UvMzI5ODg5My8xOTY5ODc2OC5wbmc=/794x1000/a3zZV8.png',
    technologies: ['Unity', 'C#', 'Photoshop', 'FL Studio'],
    viewOnItch: 'https://fantom-atom.itch.io/timeless',
    featured: false,
  },
  {
    id: 8,
    title: 'Master Runner',
    description: 'Dash, dodge, and dominate in Master Runner—a nonstop side-scrolling sprint inspired by the Tamil film Master, where you play as Vijay outrunning chaos.',
    longDescription:
      'Master Runner is a quick, silly side-scroller made as part of a YouTube dev video. Inspired by a high-energy scene from the Tamil movie Master, you play as Vijay, constantly running while avoiding a barrage of incoming obstacles. Simple, fast-paced, and made for fun.',
    category: 'game',
    image:
      'https://img.itch.zone/aW1hZ2UvMzI5ODc1MC8xOTY5NzkwNS5wbmc=/794x1000/9I6XhY.png',
    technologies: ['Unity', 'C#', 'Photoshop'],
    viewOnItch: 'https://fantom-atom.itch.io/master-runner',
    featured: false,
  },
  {
    id: 9,
    title: 'Valimai Rider',
    description: 'Rev up and ride as Ajith Kumar in Valimai Rider—a chaotic, high-speed bike dodge-fest inspired by the over-the-top stunts of Valimai.',
    longDescription:
      'Valimai Rider is a fun, fast-paced bike game inspired by the Tamil action movie Valimai, created as part of a YouTube dev video. You play as Ajith Kumar, dodging traffic and obstacles on a never-ending ride filled with ridiculous speed and last-second saves. It’s silly, cinematic, and made purely for fun.',
    category: 'game',
    image:
      'https://img.itch.zone/aW1nLzE5Njk3NTAyLmpwZw==/315x250%23c/jOQgmd.jpg',
    technologies: ['Unity', 'C#', 'Photoshop'],
    viewOnItch: 'https://fantom-atom.itch.io/valimai-rider',
    featured: false,
  },
  {
    id: 10,
    title: 'Social Status',
    description: 'Chase clout in Social Status—a one-hour game dev challenge where you collect likes and hearts to boost your influence before time runs out!',
    longDescription:
      'Social Status is a simple, fast-paced game created in just one hour for a YouTube challenge. You play as a digital influencer trying to catch falling likes and hearts to increase your social status before the timer hits zero. Your best score is saved—so come back and chase even more clout!',
    category: 'game',
    image:
      'https://img.itch.zone/aW1nLzE5Njk4MzYwLmpwZw==/315x250%23c/OF7BP2.jpg',
    technologies: ['Unity', 'C#', 'Photoshop'],
    viewOnItch: 'https://fantom-atom.itch.io/social-status',
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
            {project.viewOnItch && (
              <a
                href={project.viewOnItch}
                className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Store className="w-5 h-5" />
                <span>View on Itch</span>
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
                            <span className="absolute bottom-44 right-3 px-2 py-1 bg-yellow-400 text-black text-xs font-semibold rounded-full">
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
