import { fail } from '@sveltejs/kit'
import type { ClientResponseError } from 'pocketbase'
import type { InferType } from 'yup'
import type { UsersSchema } from '$entities/users'
import { getUsersCollection } from '$entities/users'

export const actions = {
    default: async ({ locals, request, params }) => {
        if (!('id' in params) || typeof params.id !== 'string') {
            return fail(500)
        }

        const data = Object.fromEntries(await request.formData()) as unknown as InferType<typeof UsersSchema.update>

        try {
            const res = await locals.pb.collection('users').update(params.id, data)
            return res
        } catch (_error) {
            const error = _error as ClientResponseError
            return fail(error.status, error.data)
        }
    }
}