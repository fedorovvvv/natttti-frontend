import { fail, redirect } from '@sveltejs/kit'
import type { ClientResponseError } from 'pocketbase'
import { getUsersCollection } from '$entities/users/api/collection'
import type { Actions } from './$types'

export const actions: Actions = {
    password: async ({ locals, request }) => {
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
        try {
            const usersCollection = getUsersCollection(locals.pb)
            const authMethods = await usersCollection.listAuthMethods();

            if (!authMethods) {
                return {
                    authProviderRedirect: '',
                    authProviderState: ''
                };
            }

            const redirectURL = `${url.origin}/users/ouath`
            const authProvider = authMethods.authProviders.find(({name}) => name === 'github')
            
            console.log({
                redirectURL,
                authProvider
            })

            if (!authProvider) {
                throw redirect(303, '/users/reg') 
            }
            const authProviderRedirect = `${authProvider?.authUrl}${redirectURL}`

            const state = authProvider.state;
            const verifier = authProvider.codeVerifier

            console.log({
                authProviderRedirect,
                state,
                verifier
            })

            cookies.set('state',state);
            cookies.set('verifier',verifier);

            throw redirect(302, authProviderRedirect)
            
            // await getUsersCollection(locals.pb)
            //     .authWithOAuth2({
            //         provider: 'github',
            //         createData: {
            //             firstName: 'Фродо',
            //             lastName: 'Бэггинс',
            //         },
            //         urlCallback(providerUrl) {
            //             console.log(providerUrl)
            //             // open the url in the browser
            //          }
            //     })
        } catch (_error) {
            throw redirect(303, '/users/reg') 
            // const error = _error as ClientResponseError
            // return fail(400, error.data)
        }
    }
}