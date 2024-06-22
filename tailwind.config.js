/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-color': '#8BB9BE',
        'custom-orange': '#ECB255',
        'custom-color1': '#C6E9ED',
        'custom-footer': '#5A5A5A',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

