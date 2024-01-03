import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import tailwindNesting from 'tailwindcss/nesting';
import tailwindConfig from './tailwind.config';
import autoprefixer from 'autoprefixer'
import postcssImport from 'postcss-import'

export default defineConfig({
    plugins: [
        laravel({
            input: [
				'resources/css/app.css',
                'resources/js/app.jsx',
            ],
            refresh: true,
        }),
        react(),
	],
	css: {
		postcss: {
			plugins: [
				postcssImport(),
				tailwindNesting(),
				tailwindcss(tailwindConfig),
				autoprefixer,
			],
		},
	},
});
