import { API } from './api'
import { COOKIES } from './cookies'

export const CONFIG = {
	APP: {
		NAME: 'Natttti'
	},
	TRANSITION: {
		duration: 300
	},
	API,
	COOKIES
} as const
