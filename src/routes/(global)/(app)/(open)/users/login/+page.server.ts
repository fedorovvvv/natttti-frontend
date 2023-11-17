import { redirect } from '@sveltejs/kit'
import { getUsersCollection } from '$entities/users/api/collection'
import { createPocketBaseInstance } from '$shared/api/pocketbase'
import type { Actions } from './$types'

export const actions: Actions = {
    default: async ({ locals, request }) => {
        const data = Object.fromEntries(await request.formData()) as {
            email: string
            password: string
        }

        try {
            await getUsersCollection(locals.pb)
                .authWithPassword(data.email, data.password)
        } catch (e) {
            console.error(e)
            throw e
        }

        throw redirect(303, '/')
    },
}