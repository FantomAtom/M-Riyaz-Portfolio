import React, { useState } from 'react';
import { ExternalLink, Github, Gamepad2, Smartphone, Wrench, Filter } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  category: 'game' | 'app' | 'other';
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'game' | 'app' | 'other'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: "Epic Adventure RPG",
      description: "A fantasy RPG with immersive storytelling and dynamic combat system.",
      longDescription: "An epic fantasy RPG featuring a rich storyline, dynamic combat system, character progression, and beautiful hand-crafted environments. Built with Unity and C#, featuring custom shaders and particle effects.",
      category: 'game',
      image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=600',
      technologies: ['Unity', 'C#', 'Blender', 'Photoshop'],
      githubUrl: '#',
      featured: true
    },
    {
      id: 2,
      title: "TaskFlow Mobile App",
      description: "A productivity app with smart scheduling and team collaboration features.",
      longDescription: "A comprehensive productivity application that helps teams manage tasks, deadlines, and collaborative projects. Features real-time synchronization, smart notifications, and intuitive design.",
      category: 'app',
      image: 'https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=600',
      technologies: ['React Native', 'Node.js', 'MongoDB', 'Socket.io'],
      githubUrl: '#',
      liveUrl: '#',
      featured: true
    },
    {
      id: 3,
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with modern UI and payment integration.",
      longDescription: "A complete e-commerce platform with user authentication, product management, shopping cart, payment processing, and admin dashboard. Built with modern technologies for scalability and performance.",
      category: 'app',
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600',
      technologies: ['React', 'TypeScript', 'Stripe', 'PostgreSQL'],
      githubUrl: '#',
      liveUrl: '#',
      featured: false
    },
    {
      id: 4,
      title: "Space Shooter Arcade",
      description: "Fast-paced arcade shooter with procedural levels and power-ups.",
      longDescription: "An intense arcade-style space shooter featuring procedurally generated levels, upgrade systems, boss battles, and leaderboards. Optimized for both desktop and mobile platforms.",
      category: 'game',
      image: 'https://images.pexels.com/photos/586055/pexels-photo-586055.jpeg?auto=compress&cs=tinysrgb&w=600',
      technologies: ['Unity', 'C#', 'WebGL', 'Firebase'],
      githubUrl: '#',
      liveUrl: '#',
      featured: false
    },
    {
      id: 5,
      title: "AI Art Generator",
      description: "Creative tool that generates artwork using machine learning algorithms.",
      longDescription: "An innovative application that uses machine learning to generate unique artworks based on user inputs and style preferences. Features style transfer, custom prompts, and gallery sharing.",
      category: 'other',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600',
      technologies: ['Python', 'TensorFlow', 'Flask', 'React'],
      githubUrl: '#',
      featured: true
    },
    {
      id: 6,
      title: "Weather Dashboard",
      description: "Beautiful weather app with detailed forecasts and interactive maps.",
      longDescription: "A comprehensive weather application providing detailed forecasts, interactive weather maps, alerts, and personalized recommendations. Features clean design and smooth animations.",
      category: 'app',
      image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=600',
      technologies: ['Vue.js', 'Weather API', 'Chart.js', 'Tailwind'],
      githubUrl: '#',
      liveUrl: '#',
      featured: false
    }
  ];

  const categories = [
    { id: 'all', label: 'All Projects', icon: <Filter className="w-4 h-4" /> },
    { id: 'game', label: 'Games', icon: <Gamepad2 className="w-4 h-4" /> },
    { id: 'app', label: 'Apps', icon: <Smartphone className="w-4 h-4" /> },
    { id: 'other', label: 'Other', icon: <Wrench className="w-4 h-4" /> }
  ];

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  const featuredProjects = projects.filter(project => project.featured);

  return (
    <section id="projects" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My Projects
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A collection of games, applications, and creative projects that showcase my passion for development and innovation.
          </p>
        </div>

        {/* Featured Projects */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Featured Work</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <div 
                key={project.id}
                className="group bg-gray-800 rounded-xl overflow-hidden hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
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
                    <span className="px-2 py-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs rounded-full">
                      Featured
                    </span>
                  </div>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center space-x-3">
                    {project.githubUrl && (
                      <a href={project.githubUrl} className="text-gray-400 hover:text-white transition-colors">
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} className="text-gray-400 hover:text-white transition-colors">
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

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
            <div 
              key={project.id}
              className="bg-gray-800 rounded-xl overflow-hidden hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h4 className="text-xl font-semibold text-white mb-2">{project.title}</h4>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex items-center space-x-3">
                  {project.githubUrl && (
                    <a href={project.githubUrl} className="text-gray-400 hover:text-white transition-colors">
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} className="text-gray-400 hover:text-white transition-colors">
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="relative">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className="w-full h-64 object-cover rounded-t-2xl"
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                >
                  ×
                </button>
              </div>
              <div className="p-8">
                <h3 className="text-3xl font-bold text-white mb-4">{selectedProject.title}</h3>
                <p className="text-gray-300 text-lg mb-6 leading-relaxed">{selectedProject.longDescription}</p>
                <div className="flex flex-wrap gap-3 mb-6">
                  {selectedProject.technologies.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex items-center space-x-4">
                  {selectedProject.githubUrl && (
                    <a 
                      href={selectedProject.githubUrl}
                      className="flex items-center space-x-2 bg-gray-700 text-white px-6 py-3 rounded-full hover:bg-gray-600 transition-colors"
                    >
                      <Github className="w-5 h-5" />
                      <span>View Code</span>
                    </a>
                  )}
                  {selectedProject.liveUrl && (
                    <a 
                      href={selectedProject.liveUrl}
                      className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300"
                    >
                      <ExternalLink className="w-5 h-5" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;