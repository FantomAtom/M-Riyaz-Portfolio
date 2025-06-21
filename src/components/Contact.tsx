import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, MapPin, Phone, Github, Linkedin } from 'lucide-react';

const WEB3FORMS_ACCESS_KEY = "0a037c19-b1a3-48ae-ad95-01639cf23f52";
const MIN_SUBMIT_DELAY = 3000;
const EMAIL_BLACKLIST = [
  "contactriyaz2727@gmail.com".toLowerCase(),
];
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// WaveformBackground: larger, slow-moving pulsating waves
const WaveformBackground: React.FC<{
  containerRef: React.RefObject<HTMLDivElement>;
}> = ({ containerRef }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (canvas && container) {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * devicePixelRatio;
      canvas.height = rect.height * devicePixelRatio;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(devicePixelRatio, devicePixelRatio);
      }
    }
  }, [containerRef]);

  useEffect(() => {
    resizeCanvas();
    if (containerRef.current) {
      resizeObserverRef.current = new ResizeObserver(() => {
        resizeCanvas();
      });
      resizeObserverRef.current.observe(containerRef.current);
    }
    return () => {
      if (resizeObserverRef.current && containerRef.current) {
        resizeObserverRef.current.unobserve(containerRef.current);
      }
    };
  }, [containerRef, resizeCanvas]);

  useEffect(() => {
    let time = 0;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      // Larger base amplitude
      const baseAmplitude = h * 0.05; // 5% of height
      // Pulsation: slow oscillation
      const pulsationSpeed = 0.002; // smaller => slower
      const variation = h * 0.03; // amplitude variation range
      const amp = baseAmplitude + Math.sin(time * pulsationSpeed) * variation;

      // Wave parameters
      const frequency = 0.003; // lower => longer waves
      const speed = 0.005; // slow horizontal movement

      const layers = 2; // fewer layers for simplicity
      for (let i = 0; i < layers; i++) {
        const phase = time * speed * (1 + i * 0.2);
        const offsetY = h / 2 + (i - (layers-1)/2) * 20; // slight vertical offset per layer
        ctx.beginPath();
        for (let x = 0; x <= w; x += 3) {
          const a = amp * (1 - i * 0.2);
          const y = offsetY + Math.sin((x * frequency * Math.PI * 2) + phase) * a;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        // Visible stroke: white with moderate opacity
        const alpha = 0.15 - i * 0.03;
        ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      time += 1;
      animationRef.current = requestAnimationFrame(draw);
    };

    animationRef.current = requestAnimationFrame(draw);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [containerRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{
        opacity: 0.4,
        // optional blend:
        // mixBlendMode: 'overlay',
      }}
    />
  );
};

const Contact: React.FC = () => {
  const [result, setResult] = useState("");
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const [mountTime] = useState(() => Date.now());
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Ripple overlay handlers...
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const xPct = (x / rect.width) * 100;
    const yPct = (y / rect.height) * 100;
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

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    // Honeypot
    const botcheck = formData.get('botcheck')?.toString().trim();
    if (botcheck) {
      console.warn("Honeypot triggered");
      setResult("Unable to send message.");
      setTimeout(() => setResult(""), 3000);
      return;
    }
    // Timestamp
    const elapsed = Date.now() - mountTime;
    if (elapsed < MIN_SUBMIT_DELAY) {
      setResult("Please take a moment before submitting.");
      setTimeout(() => setResult(""), 3000);
      return;
    }
    // Extract fields
    const name = formData.get('name')?.toString().trim() || "";
    const emailRaw = formData.get('email')?.toString().trim() || "";
    const email = emailRaw.toLowerCase();
    const subject = formData.get('subject')?.toString().trim() || "";
    const message = formData.get('message')?.toString().trim() || "";

    // Validations
    if (!name) {
      setResult("Name is required."); setTimeout(() => setResult(""), 3000); return;
    }
    if (name.length > 30) {
      setResult("Name must be 30 characters or fewer."); setTimeout(() => setResult(""), 3000); return;
    }
    if (!email) {
      setResult("Email is required."); setTimeout(() => setResult(""), 3000); return;
    }
    if (email.length > 100) {
      setResult("Email must be 100 characters or fewer."); setTimeout(() => setResult(""), 3000); return;
    }
    if (!EMAIL_REGEX.test(email)) {
      setResult("Please enter a valid email address."); setTimeout(() => setResult(""), 3000); return;
    }
    if (EMAIL_BLACKLIST.includes(email)) {
      setResult("Please use a different email address."); setTimeout(() => setResult(""), 3000); return;
    }
    if (!subject) {
      setResult("Subject is required."); setTimeout(() => setResult(""), 3000); return;
    }
    if (subject.length > 60) {
      setResult("Subject must be 60 characters or fewer."); setTimeout(() => setResult(""), 3000); return;
    }
    if (!message || message.length < 10) {
      setResult("Message should be at least 10 characters."); setTimeout(() => setResult(""), 3000); return;
    }
    if (message.length > 1000) {
      setResult("Message is too long (max 1000 characters)."); setTimeout(() => setResult(""), 3000); return;
    }

    // Send
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
      ref={containerRef}
    >
      {/* Waveform background */}
      <WaveformBackground containerRef={containerRef} />

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
                ${result.toLowerCase().includes("sent")
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
              ) : result.toLowerCase().includes("sent") ? (
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
              { icon: <Mail />, label: 'Email', value: 'ContactRiyaz2727@gmail.com' },
              { icon: <Phone />, label: 'Phone', value: '+91 9344735581' },
              { icon: <MapPin />, label: 'Location', value: 'Your City, Country' },
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
              {/* Hidden from_name */}
              <input type="hidden" name="from_name" value="Portfolio Contact Form" />
              {/* Hidden honeypot */}
              <input
                type="text"
                name="botcheck"
                defaultValue=""
                autoComplete="off"
                tabIndex={-1}
                style={{ display: 'none' }}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  maxLength={30}
                  className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 transition"
                />
                {/* Email */}
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  maxLength={100}
                  pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                  className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 transition"
                />
              </div>

              {/* Subject */}
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
                maxLength={60}
                className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 transition"
              />

              {/* Message */}
              <textarea
                name="message"
                rows={6}
                placeholder="Your Message…"
                required
                maxLength={1000}
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
