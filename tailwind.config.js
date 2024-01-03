import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
		"./resources/**/*.blade.php",
		"./resources/**/*.js",
		"./resources/**/*.{vue,js,ts,jsx,tsx}",
		"./node_modules/flowbite/**/*.js"
    ],
	plugins: [
		forms,
		typography
    ],
}