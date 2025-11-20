import { colors } from "./theme.config";
import { fontSize } from "./src/theme/typography";
import { SCREEN_SIZE } from "./src/utils/constants";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        gilroy: ["Gilroy", "serif"],
      },
      lineClamp: {
        0: "0",
        7: "7",
        10: "10",
        15: "15",
        20: "20",
      },
    },
    fontSize: fontSize,
    screens: {
      mobile: { max: `${SCREEN_SIZE.MOBILE_MAX}px` },
    },
    colors: {
      ...colors,
      black: colors?.black,
      yellow: {
        ...colors.yellow,
        DEFAULT: colors.yellow[500],
      },
      red: {
        ...colors.red,
        DEFAULT: colors.red[500],
      },
      blue: {
        ...colors.blue,
        DEFAULT: colors.blue[500],
      },
      green: {
        ...colors.green,
        DEFAULT: colors.green[500],
      },
      orange: {
        ...colors.orange,
        DEFAULT: colors.orange[500],
      },
      purple: {
        ...colors.purple,
        DEFAULT: colors.purple[500],
      },
      pink: {
        ...colors.pink,
        DEFAULT: colors.pink[500],
      },
      "dark-blue": {
        ...colors["dark-blue"],
        DEFAULT: colors["dark-blue"][500],
      },
      brown: {
        ...colors.brown,
        DEFAULT: colors.brown[500],
      },
      gray: {
        ...colors.gray,
        DEFAULT: colors.gray[500],
      },
      primary: colors.stone.DEFAULT,
      secondary: colors.indochine.DEFAULT,
      error: colors.red[500],
      info: colors.blue[500],
      success: colors.green[500],
      warning: colors.yellow[500],
      cancel: colors.gray[600],
      "main-text": colors.gray[950],
      "secondary-text": colors.gray[700],
      disable: colors.gray[500],
      border: colors.gray[400],
      divider: colors.gray[300],
      background: colors.gray[200],
      white: colors.gray[100],
      transparent: "transparent",
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
