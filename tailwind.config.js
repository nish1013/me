/** @type {import('tailwindcss').Config} */

const themed = (variable) => `rgb(var(${variable}) / <alpha-value>)`;

module.exports = {
  content: [
    `./src/pages/**/*.{js,jsx,ts,tsx}`,
    `./src/components/**/*.{js,jsx,ts,tsx}`,
  ],
  theme: {
    extend: {
      colors: {
        white: themed('--c-white'),
        slate: {
          50: themed('--c-slate-50'),
          100: themed('--c-slate-100'),
          200: themed('--c-slate-200'),
          300: themed('--c-slate-300'),
          400: themed('--c-slate-400'),
          500: themed('--c-slate-500'),
          600: themed('--c-slate-600'),
          700: themed('--c-slate-700'),
          800: themed('--c-slate-800'),
          900: themed('--c-slate-900'),
        },
        amber: {
          50: themed('--c-amber-50'),
          800: themed('--c-amber-800'),
        },
        band: {
          DEFAULT: themed('--c-band'),
          ink: themed('--c-band-ink'),
          'ink-muted': themed('--c-band-ink-muted'),
          chip: themed('--c-band-chip'),
          'chip-hover': themed('--c-band-chip-hover'),
        },
      },
    },
  },
  plugins: [],
};
