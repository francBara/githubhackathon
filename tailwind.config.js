module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        colors: {
            black: "#000",
            white: "#fdfdfd",
            background: "#F4F6F9",
            verde: "#8fbb3b",
            verdeScuro: "#2B302B",
            rosso: "#d13828",
            grigio: "#b2b2b2",
            grigino: "#e2e2e2",
            blu: "#1e88e5",
        },
        screens: {
            sm: "640px",
            md: "990px",
            lg: "1200px",
            xl: "1420px",
        },
        fontFamily: {
            malik: ["Montserrat", "sans-serif"],
        },
        extend: {
            gridTemplateColumns: {
                14: "repeat(14, minmax(0, 1fr))",
            },
            spacing: {
                sidebar: "14rem",
                "navbar-mobile": "5rem",
                "navbar-web": "5rem",
                "bottombar-phone": "4rem",
            },
        },
    },
    plugins: [require("flowbite/plugin")],
};
