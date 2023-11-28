import { fail } from '@sveltejs/kit'
import type { ClientResponseError } from 'pocketbase'
import { UsersApi } from '$entities/users'
import type { SocialsRecord } from '$shared/api/pocketbase'

export const actions = {
	createOrUpdate: async ({ locals, request, params, fetch }) => {
		const data = Object.fromEntries(await request.formData()) as unknown as SocialsRecord
		const socialsCollection = locals.pb.collection('socials')
		const userId = params.id
		try {
			const userSocials = await new UsersApi(locals.pb, fetch).getSocials(userId)
			if (userSocials) {
				return await socialsCollection.update(userSocials.id, data)
			} else {
				const socials = await socialsCollection.create(data, {
					expand: 'users(socials)'
				})
				await locals.pb.collection('users').update(userId, {
					socials: socials.id
				})
				return socials
			}
		} catch (_error) {
			const error = _error as ClientResponseError
			return fail(error.status, error.data)
		}
	}
}
