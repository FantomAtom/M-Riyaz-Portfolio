import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, MapPin, Phone, Github, Linkedin } from 'lucide-react';

const WEB3FORMS_ACCESS_KEY = "0a037c19-b1a3-48ae-ad95-01639cf23f52";

// Minimum time (ms) before allowing submission (to deter bots)
const MIN_SUBMIT_DELAY = 3000;

const Contact: React.FC = () => {
  const [result, setResult] = useState("");
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const [mountTime] = useState(() => Date.now());

  // Ripple overlay handlers
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
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Submit handler with timestamp & honeypot check
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    // Honeypot check: if non-empty, abort
    const botcheck = formData.get('botcheck')?.toString().trim();
    if (botcheck) {
      console.warn("Honeypot triggered, aborting submission.");
      setResult("Unable to send message.");
      setTimeout(() => setResult(""), 3000);
      return;
    }

    // Timestamp check
    const elapsed = Date.now() - mountTime;
    if (elapsed < MIN_SUBMIT_DELAY) {
      setResult("Please take a moment before submitting.");
      setTimeout(() => setResult(""), 3000);
      return;
    }

    setResult("Sending...");
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("from_name", "Portfolio Contact Form");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      if (data.success) {
        setResult("Message sent successfully!");
        form.reset();
      } else {
        console.error("Web3Forms error:", data);
        setResult(data.message || "Submission failed.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setResult("An error occurred. Please try again.");
    }
    setTimeout(() => setResult(""), 3000);
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

      {/* Toast */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: '0%', opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="fixed top-20 left-0 z-50 mx-auto w-full max-w-md px-4"
          >
            <div
              className={`flex items-center px-6 py-3 rounded-full shadow-lg
                ${result.toLowerCase().includes("success") 
                  ? "bg-gradient-to-r from-green-500 to-teal-400 text-white"
                  : result.toLowerCase().includes("sending")
                  ? "bg-gray-700 text-white"
                  : "bg-red-500 text-white"
                }`}
            >
              {result.toLowerCase().includes("sending") ? (
                <svg
                  className="w-6 h-6 mr-2 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
              ) : result.toLowerCase().includes("success") ? (
                <svg
                  className="w-6 h-6 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 14.414V17a1 1 0 10-2 0v-.586a1 1 0 102 0zm0-8.828a1 1 0 10-2 0v5.172a1 1 0 102 0V7.586z" clipRule="evenodd" />
                </svg>
              )}
              <span className="font-semibold">{result}</span>
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

          {/* Web3Forms form */}
          <div className="bg-gray-800 rounded-2xl p-8 shadow-lg">
            <form onSubmit={onSubmit} className="space-y-6">
              {/* Hidden access_key */}
              <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
              {/* Hidden from_name for better From header */}
              <input type="hidden" name="from_name" value="Portfolio Contact Form" />
              {/* Hidden honeypot text input */}
              <input
                type="text"
                name="botcheck"
                defaultValue=""
                autoComplete="off"
                tabIndex={-1}
                style={{ display: 'none' }}
              />

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

              {/* Visible Subject field */}
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

              {/* Optional hCaptcha (uncomment if desired):
                  <div className="h-captcha" data-captcha="true"></div>
                  // Plus include <script src="https://web3forms.com/client/script.js" async defer></script> in your HTML.
              */}

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
