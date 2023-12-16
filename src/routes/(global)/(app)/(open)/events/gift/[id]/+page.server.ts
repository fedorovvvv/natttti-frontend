import { error, fail } from '@sveltejs/kit'
import type { ClientResponseError } from 'pocketbase'
import type { InferType } from 'yup'
import type { GiftEventsSchema } from '$entities/giftEvents'
import type { EventsResponse, GiftEventMembersResponse, GiftEventsResponse, UsersResponse } from '$shared/api/pocketbase'

export const load = async ({ params, locals, fetch }) => {
	const { id } = params

	if (!id) error(404)

	const giftEvent = await locals.pb.collection('giftEvents').getOne<
		GiftEventsResponse<{
			event: EventsResponse
		}>
	>(id, {
		expand: 'event',
		fetch
	})

	return {
		id,
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
	},
	exit: async ({ params, locals }) => {
		if (!locals.user?.id) return fail(403)
		if (!params.id) return fail(404)

		try {
			const eventMembers = await locals.pb.collection('giftEvents').getFirstListItem<
				GiftEventsResponse<{
					members?: GiftEventMembersResponse[]
				}>
			>(`members.user.id ?= "${locals.user.id}"`, {
				expand: 'members',
				fields: 'expand.members'
			})

			const member = eventMembers?.expand?.members?.find((member) => member.user === locals.user!.id)

			if (!member?.id) return fail(404)

			const giftEvent = locals.pb.collection('giftEvents').update(params.id, {
				'members-': member.id
			})

			return giftEvent
		} catch (_error) {
			const error = _error as ClientResponseError
			return fail(error.status, error.data)
		}
	}
}
