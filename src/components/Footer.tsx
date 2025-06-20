import { Code2, Heart, Github, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 border-t border-gray-700">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Riyaz M</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Crafting digital experiences through code, design, and creativity. 
              Always pushing the boundaries of what's possible.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <div className="space-y-2">
              <a href="#about" className="block text-gray-300 hover:text-white transition-colors">
                About
              </a>
              <a href="#projects" className="block text-gray-300 hover:text-white transition-colors">
                Projects
              </a>
              <a href="#skills" className="block text-gray-300 hover:text-white transition-colors">
                Skills
              </a>
              <a href="#contact" className="block text-gray-300 hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Let's Connect</h3>
            <p className="text-gray-300">
              Follow my journey and stay updated with my latest projects and insights.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/FantomAtom" 
                className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 hover:text-white transition-all duration-300"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/m-riyaz-dev/" 
                className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 hover:text-white transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
