/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#004AC6',
        primaryDark: '#003EA8',
        primaryLight: '#DBE1FF',
        accent: '#2563EB',
        tabiiy: '#16A34A',
        tabiiyLight: '#DCFCE7',
        ink: '#191B23',
        inkSecondary: '#434655',
        inkMuted: '#737686',
        line: '#C3C6D7',
        surface: '#FAF8FF',
        danger: '#BA1A1A',
      },
      borderRadius: {
        card: '12px',
        pill: '9999px',
      },
      boxShadow: {
        card: '0px 2px 4px rgba(0,0,0,0.04)',
      },
      fontFamily: {
        sans: ['InterVariable', 'Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '1120px',
      },
      spacing: {
        18: '4.5rem',
      },
    },
  },
  plugins: [],
};
