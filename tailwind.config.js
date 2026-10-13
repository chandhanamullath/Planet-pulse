/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        planet: {
          dark: '#050811',
          card: 'rgba(10, 17, 40, 0.78)',
          cyan: '#00f5d4',
          cyanDim: '#06b6d4',
          green: '#10b981',
          greenBright: '#34d399',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      }
    },
  },
  plugins: [],
}
