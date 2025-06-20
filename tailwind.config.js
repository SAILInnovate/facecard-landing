/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        'brand-teal': '#20B2AA',
        'brand-cyan': '#40E0D0',
        'brand-dark': '#0A0A0A',
      },
      animation: {
        'starfield': 'starfield 60s linear infinite',
        'subtle-float': 'subtleFloat 6s ease-in-out infinite',
      },
      keyframes: {
        starfield: {
          '0%': { transform: 'translateY(0px)' },
          '100%': { transform: 'translateY(-1000px)' },
        },
        subtleFloat: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        }
      }
    },
  },
  plugins: [],
}