import type { SerializeOptions } from 'pocketbase'
import { dev } from '$app/environment'

export const COOKIES: {
	OPTIONS: SerializeOptions
} = {
	OPTIONS: dev ? { httpOnly: false } : { httpOnly: false, sameSite: 'lax' }
}
