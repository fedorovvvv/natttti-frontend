import { fail, redirect } from '@sveltejs/kit'
import type { ClientResponseError } from 'pocketbase'
import { getUsersCollection } from '$entities/users/api/collection'
import type { Actions } from './$types'

export const actions: Actions = {
    default: async ({ locals, request }) => {
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
}