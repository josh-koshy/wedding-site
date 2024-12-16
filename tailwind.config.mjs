/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        'haasMedium': ['"neue-haas-grotesk-display"', 'sans-serif'],
        'haasBold': ['"neue-haas-grotesk-display"', 'sans-serif'],
        'garamondPro': ['"adobe-garamond-pro"', 'serif'],
        'garamondPremiere': ['"garamond-premier-pro"', 'serif'],
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
