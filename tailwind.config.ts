// @ts-ignore
import { hairlineWidth } from "nativewind/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,jsx,ts,tsx}",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],

    presets: [require("nativewind/preset")],

    theme: {
        extend: {
            borderWidth: {
                hairline: hairlineWidth(),
            },
        },
    },

    plugins: [],
};