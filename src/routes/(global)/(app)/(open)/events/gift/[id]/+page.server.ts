import { error, fail } from '@sveltejs/kit'
import type { ClientResponseError } from 'pocketbase'
import type { InferType } from 'yup'
import type { GiftEventsSchema } from '$entities/giftEvents/index.js'
import type { EventsResponse, GiftEventMembersResponse, GiftEventsResponse, UsersResponse } from '$shared/api/pocketbase/types.js'

export const load = async ({ params, locals, fetch }) => {
	const { id } = params

	if (!id) throw error(404)

	const giftEvent = (await locals.pb.collection('giftEvents').getOne(id, {
		expand: 'event,members.user',
		fetch
	})) as GiftEventsResponse<{
		event: EventsResponse
		members?: GiftEventMembersResponse<{
			user: UsersResponse
		}>[]
	}>

	return {
		id,
		isAllow: !giftEvent.expand?.members?.some((member) => member.user === locals.user!.id),
		giftEvent
	}
}

export const actions = {
	registration: async ({ locals, request, params, fetch }) => {
		const data = Object.fromEntries(await request.formData()) as InferType<typeof GiftEventsSchema.registration>
		try {
			const user = locals.user
			if (!user?.id) return fail(403)

			const giftEvent = await locals.pb.collection('giftEvents').getOne<
				GiftEventsResponse<{
					members?: GiftEventMembersResponse<{
						user: UsersResponse
					}>[]
				}>
			>(params.id, {
				fetch,
				expand: 'members.user',
				fields: 'id,expand.members.user'
			})

			if (!giftEvent.id) {
				return fail(404)
			}

			if (giftEvent.expand?.members?.some((member) => member.user === user.id)) {
				return fail(403)
			}

			const member = await locals.pb.collection('giftEventMembers').create(
				{
					...data,
					user: user.id
				},
				{
					fetch
				}
			)

			const updatedGiftEvent = await locals.pb.collection('giftEvents').update(
				params.id,
				{
					'members+': member.id
				},
				{
					fetch
				}
			)

			return {
				giftEvent: updatedGiftEvent,
				member
			}
		} catch (_error) {
			const error = _error as ClientResponseError
			return fail(error.status, error.data)
		}
	}
}
