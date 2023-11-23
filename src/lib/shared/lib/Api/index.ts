/* eslint-disable @typescript-eslint/ban-ts-comment */
import { error } from '@sveltejs/kit'
import type { LoadEvent } from '@sveltejs/kit'
import type { HttpMethod } from '@sveltejs/kit/types/private'
import { CONFIG } from '$shared/config'

export const apiPath = `${CONFIG.API.URL}/api`

export type ApiReturn<T = unknown, R = object> = Promise<
	| (T & {
			_error?: false
	  })
	| (IApiError<R> & {
			_error: true
	  })
>

export type ApiOkReturn<T extends ApiReturn> = T extends ApiReturn<infer Ok>
	? Promise<Ok & { _error?: false }>
	: never

export const genError = (data: IApiError, title = 'Fetch error') => {
	const _message = data.title || data.title || title
	// captureException(new Error(_message))
	return error(data.status, _message)
}

export interface IApiError<R = object | undefined> {
	error?: string
	name: string
	status: number
	statusCode?: number
	title: string
	response: R
}

export interface IApiOptions {
	method: Uppercase<HttpMethod>
	path: string
	base?: string
	body?: object
	token?: string
	customFetch?: LoadEvent['fetch'] | typeof fetch
	headers?: Record<string, string>
}

export class Api<T = unknown, R = object> {
	method
	path
	body
	token
	customFetch
	headers
	base
	#fetch
	#url
	#headers
	constructor({ method, path, body, base, token, customFetch, headers }: IApiOptions) {
		this.base = base || apiPath
		this.method = method
		this.headers = headers
		this.path = path
		this.body = body
		this.token = token
		this.customFetch = customFetch
		this.#fetch = this.customFetch || fetch

		this.#url = `${this.base}${this.path ? '/' + this.path : ''}`
		this.#headers = {
			Accept: 'application/json',
			'Access-Control-Allow-Origin': '*',
			'ngrok-skip-browser-warning': '69420',
			'Content-Type': 'application/json; charset=UTF-8',
			...(this.token ? { 'X-Pfz-Token': `${this.token}` } : {}),
			...(this.headers || {})
		}
	}
	#getBody() {
		if (['GET', 'HEAD'].includes(this.method)) return {}
		return this.body
			? {
					body: JSON.stringify(this.body)
			  }
			: {}
	}

	async callFile<R>(): Promise<
		| (Response & {
				_error?: false
		  })
		| (IApiError<R> & {
				_error: true
		  })
	> {
		return await this.#fetch(this.#url, {
			method: this.method,
			headers: {
				...this.#headers
			},
			...this.#getBody()
		})
	}

	async call<R = object>({
		responseParser = 'json'
	}: {
		responseParser?: 'json' | 'text'
	} = {}): ApiReturn<T, R> {
		try {
			const res = await this.#fetch(this.#url, {
				method: this.method,
				headers: this.#headers,
				...this.#getBody()
			})

			if (!res.ok) {
				throw await res.json()
			}

			const json = await res[responseParser]()

			return await json
		} catch (error) {
			const _error = error as IApiError<R>
			// captureException(_error)
			console.error(
				`Api fetch <${this.#url}> Error: <${JSON.stringify(_error)}>. JSON: ${JSON.stringify(
					_error
				)}`
			)

			if (_error.title === 'Unauthorized') {
				// await logout()
			}

			return {
				..._error,
				_error: true
			}
		}
	}
}
