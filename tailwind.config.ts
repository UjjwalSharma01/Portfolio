import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        screens: {
            sm: "375px",
            md: "768px",
            lg: "1200px",
        },
        container: {
            center: true,
            padding: {
                DEFAULT: "1rem",
                md: "2rem",
            },
        },
        extend: {
            colors: {
                "dark-bg": "#09090b", // Zinc 950
                "card-bg": "#18181b", // Zinc 900
                "primary-text": "#f4f4f5", // Zinc 100
                "muted-text": "#a1a1aa", // Zinc 400
                "accent": "#a78bfa", // Soft Violet
            },
            fontFamily: {
                sans: "var(--font-sans)",
                serif: "var(--font-serif)",
            },
            keyframes: {
                "ping-large": {
                    "75%, 100%": {
                        transform: "scale(3)",
                        opacity: "0",
                    },
                },
                "scroll-left": {
                    "0%": {
                        transform: "translateX(0%)",
                    },
                    "100%": {
                        transform: "translateX(-50%)",
                    },
                },
                "scroll-right": {
                    "0%": {
                        transform: "translateX(-50%)",
                    },
                    "100%": {
                        transform: "translateX(0%)",
                    },
                },
                "shimmer": {
                    "0%": {
                        backgroundPosition: "0 0"
                    },
                    "100%": {
                        backgroundPosition: "-200% 0"
                    }
                },
                "spotlight": {
                    "0%": {
                        opacity: "0",
                        transform: "translate(-50%, -50%) scale(0.5)",
                    },
                    "100%": {
                        opacity: "1",
                        transform: "translate(-50%, -50%) scale(1)",
                    },
                },
            },
            animation: {
                "ping-large": "ping-large 1s ease-in-out infinite",
                "scroll-left": "scroll-left 1s linear infinite",
                "scroll-right": "scroll-right 1s linear infinite",
                "shimmer": "shimmer 2s linear infinite",
            },
        },
    },
    plugins: [],
};
export default config;
