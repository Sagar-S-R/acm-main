import type { Config } from "tailwindcss";


// Custom function to flatten color palette
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function flattenColors(colors: Record<string, string | Record<string, string>>): Record<string, string> {
	const flattened: Record<string, string> = {};
	for (const [color, shades] of Object.entries(colors)) {
		if (typeof shades === "object" && shades !== null) {
			for (const [shade, value] of Object.entries(shades)) {
				flattened[`${color}-${shade}`] = value as string;
			}
		} else if (typeof shades === "string") {
			flattened[color] = shades;
		}
	}
	return flattened;
}



// eslint-disable-next-line @typescript-eslint/no-explicit-any
function addVariablesForColors({ addBase, theme }: any) {
	const allColors = flattenColors(theme("colors"));
	const newVars = Object.fromEntries(
		Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
	);

	addBase({
		":root": newVars,
	});
}

const config: Config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			animation: {
				scroll: "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
			},
			fontFamily: {
				titillium: ['"Titillium Web"', "sans-serif"],
			},
			keyframes: {
				scroll: {
					to: {
						transform: "translate(calc(-50% - 0.5rem))",
					},
				},
			},
			colors: {
				deepBlue: "#02042a",
				lightBlue: "#2b84ea",
				lightBlue300: "#4b94ed",
				lightBlue500: "#0b72e7",
				greenLight: "#61cea6",
				grayText: "#818597",
				lightGrey: "#e2e2e2",
				grayBlue: "#344a6c",
				deepBlueHead: "#162f56",
				gray2: "#526a76",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				"custom-blue": "rgb(3, 0, 86)",
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				chart: {
					1: "hsl(var(--chart-1))",
					2: "hsl(var(--chart-2))",
					3: "hsl(var(--chart-3))",
					4: "hsl(var(--chart-4))",
					5: "hsl(var(--chart-5))",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
		},
	},
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	plugins: [addVariablesForColors, require("tailwindcss-animate")],
};

export default config;
