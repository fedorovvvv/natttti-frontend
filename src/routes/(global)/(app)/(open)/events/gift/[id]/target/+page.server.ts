import { redirect } from '@sveltejs/kit'
import { GiftEventsApi } from '$entities/giftEvents/index.js'

export const load = async ({ fetch, locals, params }) => {
	if (!locals.user?.id) {
		throw redirect(303, '/')
	}

	const giftEventId = params.id
	const giftEventsApi = new GiftEventsApi(locals.pb, fetch)
	const targets = await giftEventsApi.getTargetsByUserId(giftEventId, locals.user.id)

	return {
		giftEventId,
		target: targets[0]
	}
}
