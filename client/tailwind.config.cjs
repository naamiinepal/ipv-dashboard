module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern": "url('svgs/Frontline.svg')",
      },
      colors: {
        primary: "#247881",
        // filterBackground:"#247990"
      },
    },
  },
  plugins: [],
};
