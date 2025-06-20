import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, MapPin, Phone, Github, Linkedin } from 'lucide-react';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  // ripple overlay refs
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  // ripple on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const overlay = overlayRef.current;
    const rect = e.currentTarget.getBoundingClientRect();
    if (!overlay) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const xPct = ((e.clientX - rect.left) / rect.width) * 100;
    const yPct = ((e.clientY - rect.top) / rect.height) * 100;
    overlay.style.opacity = '1';
    rafRef.current = requestAnimationFrame(() => {
      overlay.style.background =
        `radial-gradient(circle at ${xPct}% ${yPct}%, rgba(128,0,255,0.2) 0%, rgba(128,0,255,0) 80%)`;
      rafRef.current = null;
    });
  };
  const handleMouseLeave = () => {
    if (overlayRef.current) overlayRef.current.style.opacity = '0';
  };
  useEffect(() => () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

  // custom submit to Netlify, then show toast
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    fetch('/', { method: 'POST', body: data }).then(() => {
      form.reset();
      setSubmitted(true);
      // hide toast after 3s
      setTimeout(() => setSubmitted(false), 3000);
    });
  };

  return (
    <section
      id="contact"
      className="relative py-20 bg-gray-900 text-white overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Ripple overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{ opacity: 0 }}
      />
      {/* Animated blobs */}
      <div className="absolute -top-16 -left-16 w-48 h-48 bg-purple-600 opacity-20 rounded-full animate-blob" />
      <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-blue-600 opacity-20 rounded-full animate-blob animation-delay-2000" />

      {/* Slide-in/out toast from left to right */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: '0%', opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="fixed top-20 left-0 z-50 mx-auto w-full max-w-md px-4"
          >
            <div className="flex items-center bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-full shadow-lg">
              <svg
                className="w-6 h-6 mr-2 animate-pulse"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2l3 7h-6l3-7zm-6 9l6 12 6-12h-12z" />
              </svg>
              <span className="font-semibold">Your message has been sent!</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Let's Work Together</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Have a project in mind? I'd love to hear about it.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
            <p className="text-gray-300 mb-8">
              Shoot me an email, call, or a message below!
            </p>
            {[
              { icon: <Mail />, label: 'Email', value: 'hello@yourportfolio.com' },
              { icon: <Phone />, label: 'Phone', value: '+1 (555) 123-4567' },
              { icon: <MapPin />, label: 'Location', value: 'San Francisco, CA' },
            ].map((item, i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  {React.cloneElement(item.icon as React.ReactElement, { className: 'w-6 h-6 text-white' })}
                </div>
                <div>
                  <h4 className="font-semibold">{item.label}</h4>
                  <p className="text-gray-300">{item.value}</p>
                </div>
              </div>
            ))}
            <div className="pt-8 border-t border-gray-700">
              <h4 className="font-semibold mb-4">Follow Me</h4>
              <div className="flex space-x-4">
                {[
                  { icon: <Github />, url: 'https://github.com/FantomAtom' },
                  { icon: <Linkedin />, url: 'https://www.linkedin.com/in/m-riyaz-dev/' },
                ].map((soc, i) => (
                  <a
                    key={i}
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 hover:text-white transition-all duration-300"
                  >
                    {React.cloneElement(soc.icon as React.ReactElement, { className: 'w-5 h-5' })}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Netlify Form */}
          <div className="bg-gray-800 rounded-2xl p-8 shadow-lg">
            <form
              name="contact"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <input type="hidden" name="bot-field" />
              <input type="hidden" name="form-name" value="contact" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 transition"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 transition"
                />
              </div>

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
                className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 transition"
              />

              <textarea
                name="message"
                rows={6}
                placeholder="Your Message…"
                required
                className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 transition resize-none"
              />

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 py-3 rounded-lg font-semibold hover:shadow-xl transition-transform transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5 text-white" />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
