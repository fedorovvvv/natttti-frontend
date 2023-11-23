import type { LoadEvent } from '@sveltejs/kit'
import { Api, type IApiOptions } from '.'

export class Requests {
	token
	fetch
	baseApiOptions
	constructor(token?: string, _fetch?: LoadEvent['fetch'], baseApiOptions?: Partial<IApiOptions>) {
		this.baseApiOptions = baseApiOptions || {}
		this.token = token
		this.fetch = _fetch
	}
	createApi<T, R = object>(options: IApiOptions) {
		return new Api<T, R>({
			...options,
			token: this.token,
			customFetch: this.fetch,
			...this.baseApiOptions
		})
	}
	api<T, R = object>(options: IApiOptions) {
		return this.createApi<T, R>(options).call<R>()
	}
	apiFile<T, R = object>(options: IApiOptions) {
		return this.createApi<T, R>(options).callFile<R>()
	}
}
