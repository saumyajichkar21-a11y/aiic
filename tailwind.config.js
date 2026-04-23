/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-bg': '#050D1F',
        'secondary-bg': '#0A1628',
        'accent-gold': '#F5A623',
        'accent-indigo': '#4F46E5',
        'accent-cyan': '#06B6D4',
        'text-primary': '#FFFFFF',
        'text-secondary': '#94A3B8',
        'border-color': '#1E293B',
        'success': '#10B981',
        'warning': '#F59E0B',
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, #050D1F 0%, #0A1628 50%, #050D1F 100%)',
        'gradient-gold': 'linear-gradient(135deg, #F5A623, #F59E0B)',
        'gradient-indigo': 'linear-gradient(135deg, #4F46E5, #06B6D4)',
        'gradient-card': 'linear-gradient(135deg, rgba(10,22,40,0.9), rgba(5,13,31,0.95))',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'marquee': 'marquee 30s linear infinite',
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          from: { boxShadow: '0 0 20px rgba(245,166,35,0.3)' },
          to: { boxShadow: '0 0 40px rgba(245,166,35,0.7)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
