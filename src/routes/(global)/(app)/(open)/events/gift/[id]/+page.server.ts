import { error, type ServerLoad } from '@sveltejs/kit'
import { getGiftEventsCollection, GiftEventsApi } from '$entities/giftEvents/api'

export const load: ServerLoad = async ({ params, locals }) => {
	const { id } = params

	if (!id) throw error(404)

	const giftEvent = await GiftEventsApi.getOne(id, locals.pb)

	return {
		id,
		giftEvent
	}
}
