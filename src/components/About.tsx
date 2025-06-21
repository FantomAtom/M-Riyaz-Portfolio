import React, { useRef, useEffect } from 'react';
import { Code, Gamepad2, Palette, Zap } from 'lucide-react';
import HeroImage from '../assets/images/colored.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

// required Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

type Highlight = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const highlights: Highlight[] = [
  {
    icon: <Gamepad2 className="w-6 h-6" />,
    title: 'Game Development',
    description:
      'Building Unity games and prototypes in C#, including VR experiments and jam entries that focus on engaging mechanics.',
  },
  {
    icon: <Code className="w-6 h-6" />,
    title: 'App Development',
    description:
      'Creating Fullstack React Native apps, delivering seamless mobile experiences like Dish Dash and BusBeat.',
  },
  {
    icon: <Palette className="w-6 h-6" />,
    title: '3D & Creative Design',
    description:
      'Modeling assets in Blender and crafting UI/UX elements, plus video editing for devlogs using Premiere Pro and Audacity.',
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Rapid Prototyping',
    description:
      'Experimenting with game jams, quick challenges, and new tools—iterating fast to learn and innovate continuously.',
  },
];

const TiltCard: React.FC<{ highlight: Highlight }> = ({ highlight }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = (x / rect.width) * 2 - 1;
    const py = (y / rect.height) * 2 - 1;
    const rotateMax = 8;
    const rotY = px * rotateMax;
    const rotX = -py * rotateMax;
    rafRef.current = requestAnimationFrame(() => {
      if (el) {
        el.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02,1.02,1.02)`;
      }
      rafRef.current = null;
    });
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (el) {
      el.style.transition = 'transform 0.3s ease';
      el.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
      const cleanup = () => {
        if (el) {
          el.style.transition = '';
        }
        el.removeEventListener('transitionend', cleanup);
      };
      el.addEventListener('transitionend', cleanup);
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-gray-900 p-6 rounded-xl cursor-pointer"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
        {highlight.icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-3">{highlight.title}</h3>
      <p className="text-gray-300 leading-relaxed">{highlight.description}</p>
    </div>
  );
};

const About: React.FC = () => {
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
      overlay.style.background = `radial-gradient(circle at ${xPct}% ${yPct}%, rgba(0,200,200,0.25) 0%, rgba(0,200,200,0) 70%)`;
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

  return (
    <section
      id="about"
      className="relative py-20 bg-gray-800 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Enhanced animated stars background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Base star layer */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        ></div>
        {/* Twinkling stars layer 1 */}
        <div
          className="absolute inset-0 animate-twinkle"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
            animationDelay: '0s',
          }}
        ></div>
        {/* Twinkling stars layer 2 */}
        <div
          className="absolute inset-0 animate-twinkle"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.25) 1px, transparent 1px)',
            backgroundSize: '120px 120px',
            animationDelay: '1s',
          }}
        ></div>
        {/* Sparkling stars */}
        <div
          className="absolute inset-0 animate-sparkle"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 2px, transparent 2px)',
            backgroundSize: '200px 200px',
            animationDelay: '0.5s',
          }}
        ></div>
        {/* Floating stars */}
        <div
          className="absolute inset-0 animate-float"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(180,180,255,0.3) 1.5px, transparent 1.5px)',
            backgroundSize: '150px 150px',
          }}
        ></div>
        {/* Glowing nebula */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/15 via-transparent to-blue-900/15"></div>
      </div>

      {/* Radial overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
        style={{ opacity: 0 }}
      />

      {/* Main content */}
      <div className="container mx-auto px-6 relative z-10">
        {/* Two-column intro: text left, image right */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 mb-36">
          {/* Text side */}
          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">About Me</h2>
            <p className="text-xl text-gray-300 max-w-3xl leading-relaxed mx-auto md:mx-0">
              I’m Riyaz M, a Unity and full-stack developer with 4+ years of experience delivering
              end-to-end projects. I’ve built and deployed apps using C#, React Native, Firebase, and
              AWS services, and crafted 3D assets in Blender with audio pipelines in FL Studio. I
              excel in rapid prototyping, Agile collaboration, performance optimization, and solving
              complex technical challenges to create engaging user experiences.
            </p>
          </div>

          {/* Image side */}
          <div className="flex justify-center md:justify-end pt-10">
            <div className="relative group overflow-visible mt-16 md:mt-10">
              {/* CARD CONTAINER: gradient wipe */}
              <div
                className="
                  w-72 h-96 
                  md:w-80 md:h-[28rem] 
                  rounded-2xl 
                  shadow-lg 
                  transform transition-transform duration-300 
                  origin-bottom
                  group-hover:scale-105 
                  group-hover:shadow-2xl
                  group-hover:-rotate-3
                  relative overflow-hidden
                "
              >
                {/* WHITE BASE */}
                <div className="absolute inset-0 bg-white" />

                {/* GRADIENT SLIDE */}
                <div
                  className="
                    absolute inset-0
                    bg-gradient-to-r from-blue-500 to-purple-500
                    translate-y-full
                    transition-transform duration-500 ease-out
                    group-hover:translate-y-0
                  "
                />
              </div>

          {/* Hero image */}
          <img
            src={HeroImage}
            alt="About me"
            className="
              absolute 
              bottom-0 
              left-1/2 
              w-72 md:w-80
              transform -translate-x-1/2
              origin-bottom

              /* tilt + scale as before */
              group-hover:scale-105
              transition-transform duration-300
              group-hover:-rotate-3

              /* enable filter rendering */
              filter  
            "
            style={{
              objectFit: 'contain',
              maxHeight: '120%',
              top: '-20%',
              willChange: 'filter, transform',
              transition: 'filter 0.3s ease-in-out, transform 0.3s ease',
              filter: 'grayscale(100%)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLImageElement).style.filter = 'grayscale(0%)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLImageElement).style.filter = 'grayscale(100%)';
            }}
          />
          </div>
          </div>
        </div>

{/* Highlights carousel */}
<div className="mb-16 mt-8">
  <Swiper
  modules={[Pagination, Navigation, Autoplay]}
  spaceBetween={16}
  slidesPerView={1}
  navigation
  pagination={{ clickable: true }}
  autoplay={{
    delay: 2000,
    disableOnInteraction: false,
  }}
  loop
  breakpoints={{
    768: {
      slidesPerView: 2,
      spaceBetween: 24,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 32,
    },
  }}
  className="overflow-visible"
>
  {highlights.map((h, idx) => (
    <SwiperSlide key={idx} className="!overflow-visible">
      <TiltCard highlight={h} />
    </SwiperSlide>
  ))}
</Swiper>
</div>


        <div className="mt-16 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold text-white mb-6">
                Let's Build Something Amazing Together
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Whether you're looking for a game that captivates players, an app that solves real
                problems, or a creative solution that stands out from the crowd, I'm here to bring
                your vision to life.
              </p>
            </div>
            <div className="text-center lg:text-right">
              <div className="inline-block p-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl">
                <div className="w-48 h-48 bg-gray-800 rounded-xl flex items-center justify-center">
                  <span className="text-8xl">🚀</span>
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
