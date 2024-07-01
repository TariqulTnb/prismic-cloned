const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/configurator/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/slices/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    borderRadius: {
      xs: "5px",
      md: "15px",
    },
    screens: {
      tablet: "640px",
      // => @media (min-width: 640px) { ... }

      laptop: "1024px",
      // => @media (min-width: 1024px) { ... }

      desktop: "1280px",
      // => @media (min-width: 1280px) { ... },
      xldesktop: "1440px",
      ...defaultTheme.screens,
    },
    backgroundSize: {
      sizeHero: "100% auto",
    },
    fontFamily: {
      noto: [
        "var(--font-noto)",
        "Noto Sans JP",
        "Noto Sans",
        "Inter",
        "Helvetica Neue",
        "Helvetica",
        "Arial",
        "sans-serif",
      ],
      montserrat: ["var(--font-montserrat)", "Noto Sans JP", "Times New Roman"],
    },
    extend: {
      boxShadow: {
        dropdown: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      },
      borderRadius: {
        extraLarge: "12rem",
      },
      colors: {
        ddGreen: "#3B6552",
        ddGreenHover: "#2e4e40",
        menuBeigeLight: "#F4F2EF",
        menuBeigeDark: "#F1ECE5",
        heroGreen: "rgba(95, 116, 106, 0.8)",
        modelHeroGreen: "rgba(55,81,69, 0.8)",
        menuBlack: "#1E1E1E",
        menuIconStroke: "#6B6E65",
        menuArrow: "#383838",
        menuDivider: "#CFCFCF",
        footerBrown: "#383838",
        unselectedTabGray: "#707070",
        communityGreen: "rgba(25, 140, 133, 0.80)",
      },
      spacing: {
        "4/5": "80%",
        "6/7": "85.7142857%",
        "9/10": "90%",
      },
      fontFamily: {
        sans: [
          "var(--font-noto)",
          "Noto Sans JP",
          "Noto Sans",
          "Inter",
          "Helvetica Neue",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      fontSize: {
        base: "1rem",
        lg: "1.125rem",
        xl: "1.625rem",
        "2xl": "1.75rem",
        "3xl": "1.875rem",
        "4xl": "1.625rem",
        "5xl": "2.8125rem",
      },
      fontWeight: {
        normal: "400",
        bold: "700",
      },
      backgroundImage: {
        heroDark:
          "linear-gradient(180deg, rgba(0,0,0,0) 20%, rgba(0,0,0,0.8) 100%)",
        cardDark:
          "linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.7) 100%)",
        videoHeroDark:
          "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.4) 100%)",
        mainPattern: "url('/hero_pattern.svg')",
        woodgrainTopLaptop: "url(/Topo-top.svg)",
        woodgrainBottomLaptop: "url(/Topo-bottom.svg)",
        woodgrainTopMobile: "url(/mobile_topo_top.svg)",
        woodgrainBottomMobile: "url(/mobile_topo_bottom.svg)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
