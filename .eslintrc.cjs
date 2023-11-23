module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	extends: [
		'eslint:recommended',
		'plugin:svelte/recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier',
		'@feature-sliced'
	],
	plugins: ['@typescript-eslint'],
	ignorePatterns: ['*.cjs'],
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser'
			}
		}
	],
	settings: {
		'svelte3/typescript': () => require('typescript'),
		'import/resolver': {
			typescript: {
				alwaysTryTypes: true,
				project: './tsconfig.json'
			}
		}
	},
	parserOptions: {
		project: './tsconfig.json',
		extraFileExtensions: ['.svelte'],
		sourceType: 'module',
		ecmaVersion: 2020
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	rules: {
		'prefer-const': 2,
		'no-var': 2,
		'@typescript-eslint/no-unused-vars': 0,
		'@typescript-eslint/no-non-null-assertion': 0,
		'@typescript-eslint/ban-ts-comment': 0,
		'import/no-internal-modules': 0,
		'svelte/valid-compile': [
			0,
			{
				ignoreWarnings: true
			}
		]
	}
}
