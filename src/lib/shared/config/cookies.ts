import type { CookieSerializeOptions } from 'cookie'
import { dev } from '$app/environment'

export const COOKIES: {
	OPTIONS: CookieSerializeOptions & {path: string}
} = {
	OPTIONS: dev ? { httpOnly: false, path: '.' } : { httpOnly: false, sameSite: 'lax', path: '.' }
}
