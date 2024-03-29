import { fail, redirect } from '@sveltejs/kit'
import type { CookieSerializeOptions } from 'cookie'
import type { ClientResponseError } from 'pocketbase'
import type { InferType } from 'yup'
import { CONFIG } from '$shared/config'
import type { PocketBaseAuthSchema } from '$shared/model'

export const actions = {
	password: async ({ locals, request, fetch }) => {
		const data = Object.fromEntries(await request.formData()) as InferType<typeof PocketBaseAuthSchema.withPassword>
		try {
			await locals.pb.collection('users').authWithPassword(data.identity, data.password, {
				fetch
			})
		} catch (_error) {
			const error = _error as ClientResponseError
			return fail(error.status, error.data)
		}

		throw redirect(303, '/')
	},
	github: async ({ cookies, url, locals }) => {
		const usersCollection = locals.pb.collection('users')
		const authMethods = await usersCollection.listAuthMethods()

		const redirectURL = `${url.origin}/users/oauth`
		const authProvider = authMethods.authProviders.find(({ name }) => name === 'github')

		if (!authProvider) {
			console.log({authProvider})
			throw redirect(303, '/users/signup')
		}
		const authProviderRedirect = `${authProvider.authUrl}${redirectURL}`

		const state = authProvider.state
		const verifier = authProvider.codeVerifier

		const cookiesOptions = {
			...CONFIG.COOKIES.OPTIONS,
			path: '.'
		}

		cookies.set('state', state, cookiesOptions)
		cookies.set('verifier', verifier, cookiesOptions)

		throw redirect(302, authProviderRedirect)
	}
}
