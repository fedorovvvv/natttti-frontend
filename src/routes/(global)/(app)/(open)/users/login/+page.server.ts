import { fail, redirect } from '@sveltejs/kit'
import type { ClientResponseError } from 'pocketbase'
import { getUsersCollection } from '$entities/users/api/collection'
import type { Actions } from './$types'

export const actions: Actions = {
    password: async ({ locals, request, cookies }) => {
        const data = Object.fromEntries(await request.formData()) as {
            identity: string
            password: string
        }
        try {
            await getUsersCollection(locals.pb)
                .authWithPassword(data.identity, data.password)
        } catch (_error) {
            const error = _error as ClientResponseError
            return fail(error.status, error.data)
        }

        throw redirect(303, '/')
    },
    github: async ({ cookies, url, locals}) => {
        const usersCollection = getUsersCollection(locals.pb)
        const authMethods = await usersCollection.listAuthMethods();

        const redirectURL = `${url.origin}/users/oauth`
        const authProvider = authMethods.authProviders.find(({name}) => name === 'github')
        
        if (!authProvider) {
            throw redirect(303, '/users/reg') 
        }
        const authProviderRedirect = `${authProvider.authUrl}${redirectURL}`

        const state = authProvider.state;
        const verifier = authProvider.codeVerifier

        cookies.set('state',state, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax'
        });
        cookies.set('verifier',verifier, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax'
        });

        throw redirect(302, authProviderRedirect)
    }
}