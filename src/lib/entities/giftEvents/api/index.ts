import { pb, type GiftEventsResponse, type EventsResponse } from '$shared/api/pocketbase'

export * from './collection'

export class GiftEventsApi {
	static async getOne(id: string, client = pb) {
		return (await client.collection('giftEvents').getOne(id, {
			expand: 'event'
		})) as GiftEventsResponse<{
			event: EventsResponse
		}>
	}
}
