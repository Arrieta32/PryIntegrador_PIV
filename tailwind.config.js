/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#0b0616',
        neon: {
          magenta: '#ff2a85',
          orange: '#ff7b00',
          cyan: '#00f0ff',
          purple: '#9d4edd',
        },
      },
      fontFamily: {
        display: ['Oswald', 'Anton', 'sans-serif'],
        script: ['Yellowtail', 'Pacifico', 'cursive'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        neon: '0 0 20px rgba(255, 42, 133, 0.45), 0 0 40px rgba(157, 78, 221, 0.25)',
        cyan: '0 0 18px rgba(0, 240, 255, 0.4)',
        gold: '0 0 16px rgba(255, 215, 0, 0.35)',
      },
      backgroundImage: {
        sunset:
          'radial-gradient(ellipse at 50% 0%, rgba(255, 123, 0, 0.35) 0%, transparent 55%), radial-gradient(ellipse at 20% 30%, rgba(255, 42, 133, 0.25) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(157, 78, 221, 0.3) 0%, transparent 45%)',
      },
      keyframes: {
        shimmer: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        rise: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 12px rgba(255, 42, 133, 0.4)' },
          '50%': { boxShadow: '0 0 28px rgba(0, 240, 255, 0.55)' },
        },
      },
      animation: {
        shimmer: 'shimmer 2.4s ease-in-out infinite',
        rise: 'rise 0.7s ease-out both',
        pulseGlow: 'pulseGlow 2.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
