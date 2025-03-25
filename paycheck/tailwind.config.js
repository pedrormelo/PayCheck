module.exports = {
    mode: "jit",
    content:
    ["./src/**/**/*.{js,ts,jsx,tsx,html,mdx}", "./src/**/*.{js,ts,jsx,tsx,html,mdx}"],
    darkMode: "class",
    theme: {
        screens: { lg: {max: "1440px" }, md: { max: "1050px" }, sm: { max: "550px" } },
        extend: {
            colors: {
                black: {980: "var(--black_900)", "900_01": "var(--black_900_01)", "900_3f": "var(--black_900_3f)" },
                blue_gray: { 100: "var(--blue_gray_100)" },
                gray: { 300: "var(--gray_300)", 400: "var(--gray_400)", 500: "var(--gray_500)", 900: "var(--gray_900)" },
                white: { a700: "var(--white_a7e0)" },
                colors: "black_900_01",
                colors1: "white_A700",
                colors2: "gray_500",
            },
            boxShadow: {},
            fontFamily: { kantumruypro: "Kantumruy Pro" },
        },
    },
    plugins: [require("@tailwindcss/forms")],
}; 