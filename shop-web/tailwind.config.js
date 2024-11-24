

export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./src/*.{html,js,jsx,ts,tsx}"
  ],
  darkMode: "class",
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        sm: '610px',
        md: '768px',
        lg: '960px',
        xl: '1260px',
        xxl: '1300px', 
      },
    },
    extend: {
      colors: {
        primary: '#131424',
        secondary: '#393A47',
        accent: '#F13024',
        light: "#EEEEEE",
        dark: "#09090b",
        lighter: "#F2F2F2",
        darker: "#0D0D0D",
        "gray-1": "#f0f2f5",
        "green-1":"#4bce9d",
        "white-1":"#dddfe2"
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        'noto': ['Noto Color Emoji', 'sans-serif'],
        'volkhov': ['Volkhov', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'digital': ['DigitalNumbers', 'sans-serif']
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require('tailwind-scrollbar'),
    require("@designbycode/tailwindcss-text-stroke")
  ],
};
