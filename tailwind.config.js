import { fontSize } from "./src/theme/typography";
import { SCREEN_SIZE } from "./src/utils/constants";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}", // scan tất cả file trong src với các đuôi này
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
      fontSize: fontSize,
      screens: {
        mobile: { max: `${SCREEN_SIZE.MOBILE_MAX}px` },
      },
    }, // giữ nguyên mặc định, chưa tùy chỉnh gì
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
