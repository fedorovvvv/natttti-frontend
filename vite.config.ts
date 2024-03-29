import { resolve } from 'path'
import { clueIconsPlugin } from '@cluue/icons/plugin'
import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [sveltekit(), clueIconsPlugin()],
	logLevel: 'info',
	build: {
		minify: true
	},
	resolve: {
		alias: {
			$routes: resolve('src/routes/'),
			$locales: resolve('src/lib/locales'),
			$shared: resolve('src/lib/shared'),
			$entities: resolve('src/lib/entities'),
			$features: resolve('src/lib/features'),
			$widgets: resolve('src/lib/widgets'),
			$appLayer: resolve('src/lib/appLayer')
		}
	}
})
