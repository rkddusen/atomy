/** @type {import('tailwindcss').Config} */
const px0_1000 = { ...Array.from(Array(1001)).map((_, i) => `${i}px`) };
const px0_100 = { ...Array.from(Array(101)).map((_, i) => `${i}px`) };

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: px0_100,
      width: {
        ...px0_1000,
      },
      height: {
        ...px0_1000,
      },
      padding: {
        ...px0_100,
      },
      spacing: {
        ...px0_1000,
      },
    },
  },
};
