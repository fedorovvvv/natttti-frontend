import type { CookieSerializeOptions } from 'cookie'
import { dev } from '$app/environment'

export const COOKIES: {
	OPTIONS: CookieSerializeOptions
} = {
	OPTIONS: dev ? { httpOnly: false } : { httpOnly: false, sameSite: 'lax' }
}
