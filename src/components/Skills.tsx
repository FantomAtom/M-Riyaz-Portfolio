import React from 'react';
import { Code, Database, Gamepad2, Palette, Globe, Smartphone } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend Development",
      icon: <Code className="w-6 h-6" />,
      skills: ["React", "TypeScript", "Vue.js", "Tailwind CSS", "Next.js", "HTML5/CSS3"]
    },
    {
      title: "Game Development",
      icon: <Gamepad2 className="w-6 h-6" />,
      skills: ["Unity", "C#", "Unreal Engine", "Godot", "WebGL", "Game Design"]
    },
    {
      title: "Backend Development",
      icon: <Database className="w-6 h-6" />,
      skills: ["Node.js", "Python", "PostgreSQL", "MongoDB", "Firebase", "REST APIs"]
    },
    {
      title: "Mobile Development",
      icon: <Smartphone className="w-6 h-6" />,
      skills: ["React Native", "Flutter", "iOS", "Android", "Expo", "PWA"]
    },
    {
      title: "Design & UI/UX",
      icon: <Palette className="w-6 h-6" />,
      skills: ["Figma", "Adobe Creative Suite", "Blender", "UI Design", "Prototyping", "3D Modeling"]
    },
    {
      title: "Web Technologies",
      icon: <Globe className="w-6 h-6" />,
      skills: ["WebGL", "Three.js", "Canvas API", "WebRTC", "GraphQL", "Socket.io"]
    }
  ];

  return (
    <section id="skills" className="py-20 bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Skills & Technologies
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A comprehensive toolkit spanning multiple disciplines and technologies, 
            constantly evolving with the latest industry standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div 
              key={index}
              className="bg-gray-900 p-6 rounded-xl hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mr-4">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-white">{category.title}</h3>
              </div>
              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="flex items-center">
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
              Always Learning, Always Growing
            </h3>
            <p className="text-gray-300 text-lg mb-8 max-w-3xl mx-auto leading-relaxed">
              The world of technology moves fast, and I move with it. I'm constantly exploring new frameworks, 
              languages, and methodologies to stay at the cutting edge of development.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {['AI/ML', 'Blockchain', 'AR/VR', 'IoT', 'Cloud Computing', 'DevOps'].map((tech) => (
                <span 
                  key={tech}
                  className="px-4 py-2 bg-gray-700 text-gray-300 rounded-full text-sm hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 hover:text-white transition-all duration-300"
                >
                  {tech}
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