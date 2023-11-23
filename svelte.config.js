import { preprocessMeltUI } from '@melt-ui/pp'
import adapter from '@sveltejs/adapter-auto'
import autoprefixer from 'autoprefixer'
import sveltePreprocess from 'svelte-preprocess'
import sequence from 'svelte-sequential-preprocessor'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: sequence([
		sveltePreprocess({
			sass: {
				includePaths: ['./src/styles', './src/lib'],
				prependData: `@use "sass:math"\n@import '_prepend.sass'`,
				renderSync: false
			},
			postcss: {
				plugins: [autoprefixer()]
			},
			typescript: {
				tsconfigDirectory: './tsconfig.json'
			}
		}),
		preprocessMeltUI()
	]),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		prerender: {
			handleMissingId: 'warn'
		},
		typescript: {
			config(config) {
				config.include.push('../svelte.config.js')
			}
		}
	}
}

export default config
