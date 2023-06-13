module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      display: ["Open Sans", "sans-serif"],
      body: ["Open Sans", "sans-serif"],
    },
    extend: {
      fontSize: {
        14: "14px",
      },
      backgroundColor: {
        "main-bg": "#FAFBFB",
        "flow_blue":"#2C1F39",
        "salmon_tulip":"#FFD2CB",
        "periwinkle":"#D6CDE9",
        "black_plum":"#110C16",
        "plum_tongue":"#2C1F39",
        "lemon_cake":"#FFE175",
        "pure_white":"#FFFFFF",
        "mellow_scarlet":"#FC3209",
        "grey_150":"#D9D9D9",
        "grey_500":"#757575",
        "spring_green":"#6CE151",
        "main-dark-bg": "#20232A",
        "secondary-dark-bg": "#33373E",
        "light-gray": "#F7F7F7",
        "half-transparent": "rgba(0, 0, 0, 0.5)",
      },
      borderWidth: {
        1: "1px",
      },
      borderColor: {
        color: "rgba(0, 0, 0, 0.1)",
      },
      width: {
        400: "400px",
        760: "760px",
        780: "780px",
        800: "800px",
        1000: "1000px",
        1200: "1200px",
        1400: "1400px",
      },
      height: {
        80: "80px",
      },
      minHeight: {
        590: "590px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/data/back2.png')",
      },
    },
  },
  plugins: [],
};
