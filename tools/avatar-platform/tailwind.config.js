/** @type {import('tailwindcss').Config} */
const { nextui } = require('@nextui-org/react');

module.exports = {
	content: [
		'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		extend: {
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)'
			}
		}
	},
	darkMode: 'class',
	plugins: [
		nextui({
			themes: {}
		})
	]
};
