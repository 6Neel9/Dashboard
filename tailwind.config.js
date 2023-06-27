module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",
  "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}"
],
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
      transparent: "transparent",
      current: "currentColor",
      extend: {
        colors: {
          // light mode
          tremor: {
            brand: {
              faint: "#eff6ff", // blue-50
              muted: "#bfdbfe", // blue-200
              subtle: "#60a5fa", // blue-400
              DEFAULT: "#3b82f6", // blue-500
              emphasis: "#1d4ed8", // blue-700
              inverted: "#ffffff", // white
            },
            background: {
              muted: "#f9fafb", // gray-50
              subtle: "#f3f4f6", // gray-100
              DEFAULT: "#ffffff", // white
              emphasis: "#374151", // gray-700
            },
            border: {
              DEFAULT: "#e5e7eb", // gray-200
            },
            ring: {
              DEFAULT: "#e5e7eb", // gray-200
            },
            content: {
              subtle: "#9ca3af", // gray-400
              DEFAULT: "#6b7280", // gray-500
              emphasis: "#374151", // gray-700
              strong: "#111827", // gray-900
              inverted: "#ffffff", // white
            },
          },
          // dark mode
          "dark-tremor": {
            brand: {
              faint: "#0B1229", // custom
              muted: "#172554", // blue-950
              subtle: "#1e40af", // blue-800
              DEFAULT: "#3b82f6", // blue-500
              emphasis: "#60a5fa", // blue-400
              inverted: "#030712", // gray-950
            },
            background: {
              muted: "#131A2B", // custom
              subtle: "#1f2937", // gray-800
              DEFAULT: "#111827", // gray-900
              emphasis: "#d1d5db", // gray-300
            },
            border: {
              DEFAULT: "#1f2937", // gray-800
            },
            ring: {
              DEFAULT: "#1f2937", // gray-800
            },
            content: {
              subtle: "#4b5563", // gray-600
              DEFAULT: "#6b7280", // gray-600
              emphasis: "#e5e7eb", // gray-200
              strong: "#f9fafb", // gray-50
              inverted: "#000000", // black
            },
          },
        },
        boxShadow: {
          // light
          "tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
          "tremor-card": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
          "tremor-dropdown": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
          // dark
          "dark-tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
          "dark-tremor-card": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
          "dark-tremor-dropdown": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        },
        borderRadius: {
          "tremor-small": "0.375rem",
          "tremor-default": "0.5rem",
          "tremor-full": "9999px",
        },
        fontSize: {
          "tremor-label": ["0.75rem"],
          "tremor-default": ["0.875rem", { lineHeight: "1.25rem" }],
          "tremor-title": ["1.125rem", { lineHeight: "1.75rem" }],
          "tremor-metric": ["1.875rem", { lineHeight: "2.25rem" }],
        },
      },
    },
  },
  safelist: [
    {
      pattern:
        /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
  ],
  plugins: [require("@headlessui/tailwindcss")],
};
