import { fail, redirect } from '@sveltejs/kit'
import type { ClientResponseError } from 'pocketbase'
import type { InferType } from 'yup'
import { getUsersCollection } from '$entities/users/api/collection'
import type { createUserSchema } from '$entities/users/model/schema'
import type { Actions } from './$types'

export const actions: Actions = {
    default: async ({ locals, request }) => {
        const data = Object.fromEntries(await request.formData()) as unknown as InferType<ReturnType<typeof createUserSchema>>
        const userCollection = getUsersCollection(locals.pb)
        try {
            await userCollection.create(data)
            await userCollection.authWithPassword(data.username, data.password)
        } catch (_error) {
            const error = _error as ClientResponseError
            return fail(error.status, error.data)
        }

        throw redirect(303, '/')
    },
}