import { fail } from '@sveltejs/kit'
import type { ClientResponseError } from 'pocketbase'
import type { InferType } from 'yup'
import type { UsersSchema } from '$entities/users'
import { getUsersCollection } from '$entities/users'
import type { Actions } from '../$types'

export const actions: Actions = {
    default: async ({ locals, request, params }) => {
        if (!('id' in params) || typeof params.id !== 'string') {
            return fail(500)
        }

        const data = Object.fromEntries(await request.formData()) as unknown as InferType<typeof UsersSchema.update>

        try {
            const res = await getUsersCollection(locals.pb)
                .update(params.id, data)
            return res
        } catch (_error) {
            const error = _error as ClientResponseError
            return fail(error.status, error.data)
        }
    }
}