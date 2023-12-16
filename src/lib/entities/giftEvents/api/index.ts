import { pb, type GiftEventsResponse, type EventsResponse, type GiftEventMembersResponse, type UsersResponse, PocketBaseApi } from '$shared/api/pocketbase'
import { QueryBase } from '$shared/lib/Query'

export class GiftEventsApi extends PocketBaseApi {
	async getTargetsByUserId(giftEventId:string, userId:string) {
		const result = await this.client.collection('giftEvents').getOne<GiftEventsResponse<{
			members: GiftEventMembersResponse<{
				targets: GiftEventMembersResponse<{
					user: UsersResponse
				}>[]
			}>[]
		}>>(giftEventId, {
			expand: 'members.targets, members.targets.user',
			fields: 'expand.members.user, expand.members.expand.targets.description, expand.members.expand.targets.expand.user'
		})

		const member = result.expand?.members.find(({user}) => user === userId)
		const targets = member?.expand?.targets || []

		return targets as unknown as Array<Pick<Exclude<typeof targets, undefined>[0], 'description' | 'expand'>>
	}
}

export class GiftEventsQueries {
	static collection = pb.collection('giftEvents')

	static getOne = new QueryBase('giftEvents.getOne', async (id: string) => {
		return await this.collection.getOne<
			GiftEventsResponse<{
				event: EventsResponse
			}>
		>(id, {
			expand: 'event'
		})
	})

	static isUserRegistered = new QueryBase('giftEvents.isUserRegistered', async (giftEventId: string, userId: string) => {
		const giftEvent = await this.collection.getOne<
			GiftEventsResponse<{
				members: GiftEventMembersResponse<{
					user: UsersResponse
				}>[]
			}>
		>(giftEventId, {
			expand: 'members.user',
			fields: 'expand.members.user'
		})
		return {
			result: !!giftEvent.expand?.members?.some((member) => member.user === userId),
			members: giftEvent.expand?.members
		}
	})
}
