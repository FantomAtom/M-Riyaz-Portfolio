import React from 'react';
import { Code, Gamepad2, Palette, Zap } from 'lucide-react';

const About = () => {
  const highlights = [
    {
      icon: <Gamepad2 className="w-6 h-6" />,
      title: "Game Development",
      description: "Creating engaging and immersive gaming experiences with modern engines and frameworks."
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "App Development",
      description: "Building responsive web and mobile applications with cutting-edge technologies."
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Creative Design",
      description: "Designing beautiful user interfaces and experiences that delight users."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Innovation",
      description: "Always exploring new technologies and pushing the boundaries of what's possible."
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About Me
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            I'm a passionate developer who loves creating digital experiences that make a difference. 
            With expertise spanning game development, web applications, and creative technology, 
            I bring ideas to life through code and design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((highlight, index) => (
            <div 
              key={index}
              className="bg-gray-900 p-6 rounded-xl hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                {highlight.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {highlight.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {highlight.description}
              </p>
            </div>
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