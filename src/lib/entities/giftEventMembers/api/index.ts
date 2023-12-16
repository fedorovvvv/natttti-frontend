import { PocketBaseApi } from '$shared/api/pocketbase'

export class GiftEventMembersApi extends PocketBaseApi {
	async getTargetByGiftEventId(giftEventId: string, userId: string) {
		return this.client.collection('giftEvents').getOne(giftEventId)
	}
}
