/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        blob: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%':   { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%':   { transform: 'translate(-20px, 20px) scale(0.9)' },
        },
        twinkle: {
          '0%':   { opacity: '0.2' },
          '50%':  { opacity: '1' },
          '100%': { opacity: '0.2' },
        },
        sparkle: {
          '0%':   { transform: 'scale(1)', opacity: '0.4' },
          '50%':  { transform: 'scale(1.05)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '0.4' },
        },
        float: {
          '0%':   { transform: 'translateY(0px)' },
          '50%':  { transform: 'translateY(-10px)' },
          '100%': { transform: 'translateY(0px)' },
        }
      },
      animation: {
        blob: 'blob 7s infinite',
        twinkle: 'twinkle 4s ease-in-out infinite',
        sparkle: 'sparkle 3s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};
