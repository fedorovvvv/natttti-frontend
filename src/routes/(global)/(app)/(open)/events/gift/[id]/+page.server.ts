import { error, type ServerLoad } from '@sveltejs/kit'
import { getGiftEventsCollection } from '$entities/giftEvents/api'

export const load: ServerLoad = async ({ params, locals }) => {
	const { id } = params

	if (!id) throw error(404)

	const post = await getGiftEventsCollection(locals.pb).getOne(id)

	return {
		id,
		post
	}
}
