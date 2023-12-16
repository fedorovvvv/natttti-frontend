import { redirect } from '@sveltejs/kit'
import { UsersApi } from '$entities/users'

export const load = async ({ locals, parent, fetch }) => {
	const { user } = await parent()

	if (!user?.id) throw redirect(303, '/');

	return {
		socials: await new UsersApi(locals.pb, fetch).getSocials(user.id)
	}
}
