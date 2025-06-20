import React, { useRef, useEffect, useState } from 'react';
import { Github, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

const roles = [
  'Game Developer',
  'Web Developer',
  'App Developer',
  'Creative Enthusiast',
  'Full-Stack Engineer',
];

export default function Hero() {
  // Radial overlay refs
  const overlayRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  // Typing effect state
  const [display, setDisplay] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [typingForward, setTypingForward] = useState(true);

  // Typing loop
  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout: number;

    // If we’ve just finished typing, pause before erasing:
    if (typingForward && charIndex === currentRole.length) {
      timeout = window.setTimeout(() => setTypingForward(false), 900);
    }
    // If we’ve just finished erasing, pause before next role
    else if (!typingForward && charIndex === 0) {
      timeout = window.setTimeout(() => {
        setTypingForward(true);
        setRoleIndex((ri) => (ri + 1) % roles.length);
      }, 500);
    }
    // Normal typing / erasing
    else {
      const speed = typingForward ? 120 : 60;
      timeout = window.setTimeout(() => {
        const nextCharIndex = typingForward ? charIndex + 1 : charIndex - 1;
        setDisplay(currentRole.slice(0, nextCharIndex));
        setCharIndex(nextCharIndex);
      }, speed);
    }

    return () => window.clearTimeout(timeout);
  }, [charIndex, roleIndex, typingForward]);


  // Mouse-follow ripple effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const overlay = overlayRef.current;
    const sec = e.currentTarget.getBoundingClientRect();
    if (!overlay) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const xPct = ((e.clientX - sec.left) / sec.width) * 100;
    const yPct = ((e.clientY - sec.top) / sec.height) * 100;

    overlay.style.opacity = '1';
    rafRef.current = requestAnimationFrame(() => {
      overlay.style.background = 
        `radial-gradient(circle at ${xPct}% ${yPct}%, rgba(128,0,255,0.3) 0%, rgba(128,0,255,0) 75%)`;
      rafRef.current = null;
    });
  };
  const handleMouseLeave = () => {
    if (overlayRef.current) overlayRef.current.style.opacity = '0';
  };
  useEffect(() => () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

  // Scroll helper
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  // helper: choose “a” vs. “an”
  const currentFullRole = roles[roleIndex];
  const article = /^[AEIOU]/i.test(currentFullRole) ? 'an' : 'a';

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* radial overlay (unchanged) */}
      <div
        ref={overlayRef}
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
        style={{ opacity: 0 }}
      />

      <div className="container mx-auto px-6 py-20 relative z-10 text-center">
        {/* Gradient greeting */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="
            text-5xl md:text-7xl font-bold mb-6
            bg-gradient-to-r from-purple-400 to-blue-400
            bg-clip-text text-transparent
            leading-tight md:leading-tight
          "
        >
          Hey there! I&apos;m Riyaz M
        </motion.h1>

        {/* Typing effect line with dynamic article */}
        <h2 className="text-3xl md:text-4xl font-semibold h-12 mb-6">
          I&apos;m {article}&nbsp;
          <span className="border-r-2 border-purple-500 pr-1 animate-pulse">
            {display}
          </span>
        </h2>

        {/* Subtitle & button (unchanged) */}
        <p className="text-lg md:text-xl text-gray-300 mb-10">
          Crafting innovative apps, fun games, and digital experiences that spark imagination.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={scrollToProjects}
            className="bg-gradient-to-r from-purple-500 to-blue-500 px-8 py-3 rounded-full text-lg font-semibold hover:shadow-xl transition-transform transform hover:scale-105"
          >
            View My Work
          </button>
        </div>

        <div className="flex items-center justify-center space-x-6 mt-12">
          <a href="https://github.com/FantomAtom" className="text-gray-400 hover:text-white">
            <Github className="w-6 h-6" />
          </a>
          <a href="https://www.linkedin.com/in/m-riyaz-dev/" className="text-gray-400 hover:text-white">
            <Linkedin className="w-6 h-6" />
          </a>
        </div>
      </div>
    </section>
  );
}
