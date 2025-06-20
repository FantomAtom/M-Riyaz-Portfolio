import React, { useState, useEffect } from 'react';
import { Menu, X, Code2, Gamepad2, User, Mail } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      
      // Determine if scrolled past threshold
      setScrolled(currentScrollPos > 50);
      
      // Determine scroll direction and visibility
      const isScrollingDown = currentScrollPos > prevScrollPos;
      
      // Only hide header when scrolling down and past threshold
      setVisible(!isScrollingDown || currentScrollPos < 50);
      
      setPrevScrollPos(currentScrollPos);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header 
      className={`fixed w-full top-0 z-50 transition-all duration-300 transform ${
        scrolled ? 'bg-gray-900/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      } ${visible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => scrollToSection('hero')}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Portfolio</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('about')}
              className="text-gray-300 hover:text-white transition-colors flex items-center space-x-1"
            >
              <User className="w-4 h-4" />
              <span>About</span>
            </button>
            <button 
              onClick={() => scrollToSection('projects')}
              className="text-gray-300 hover:text-white transition-colors flex items-center space-x-1"
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Projects</span>
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 flex items-center space-x-1"
            >
              <Mail className="w-4 h-4" />
              <span>Contact</span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-700">
            <div className="flex flex-col space-y-4 pt-4">
              <button 
                onClick={() => scrollToSection('about')}
                className="text-gray-300 hover:text-white transition-colors flex items-center space-x-2"
              >
                <User className="w-4 h-4" />
                <span>About</span>
              </button>
              <button 
                onClick={() => scrollToSection('projects')}
                className="text-gray-300 hover:text-white transition-colors flex items-center space-x-2"
              >
                <Gamepad2 className="w-4 h-4" />
                <span>Projects</span>
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-gray-300 hover:text-white transition-colors flex items-center space-x-2"
              >
                <Mail className="w-4 h-4" />
                <span>Contact</span>
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
