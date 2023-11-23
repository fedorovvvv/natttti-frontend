// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import Cookies, { type CookieAttributes } from 'js-cookie'
import { browser } from '$app/environment'

export class CookiesHelper {
	static set(key: string, value: string, _options: Partial<CookieAttributes> = {}) {
		if (browser) {
			const options: CookieAttributes = {
				expires: 7,
				secure: true,
				sameSite: 'Lax',
				..._options
			}
			Cookies.set(key, value, options)
		}
	}
	static get(key: Parameters<typeof CookiesHelper.set>[0] = '') {
		if (browser) {
			return Cookies.get(key) || ''
		}
		return ''
	}
	static remove(key: Parameters<typeof CookiesHelper.set>[0] = '', options?: CookieAttributes) {
		if (browser) {
			Cookies.remove(key, options)
		}
	}
	static clearAll() {
		// if (browser) {
		//     const cookies = document.cookie.split(";");
		//     for (let i = 0; i < cookies.length; i++) {
		//         const cookie = cookies[i];
		//         const eqPos = cookie.indexOf("=");
		//         const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
		//         document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
		//     }
		// }
	}
}
