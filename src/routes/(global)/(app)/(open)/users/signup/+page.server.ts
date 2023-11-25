import { fail, redirect } from '@sveltejs/kit'
import type { ClientResponseError } from 'pocketbase'
import type { InferType } from 'yup'
import type { UsersSchema } from '$entities/users'

export const actions = {
	default: async ({ locals, request }) => {
		const data = Object.fromEntries(await request.formData()) as unknown as InferType<
			typeof UsersSchema.create
		>
		const userCollection = locals.pb.collection('users')
		try {
			const res = await userCollection.create(data)
			await userCollection.authWithPassword(res.username, data.password)
		} catch (_error) {
			const error = _error as ClientResponseError
			return fail(error.status, error.data)
		}

		throw redirect(303, '/')
	}
}
