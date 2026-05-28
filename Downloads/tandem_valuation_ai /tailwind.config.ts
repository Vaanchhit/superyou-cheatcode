import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './frontend/app/**/*.{js,ts,jsx,tsx}',
    './frontend/components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        surface: '#f8f9fb',
        panel: '#ffffff',
        border: '#d6d9df',
        primary: '#0f4c81',
        muted: '#718096'
      }
    }
  },
  plugins: []
};

export default config;
