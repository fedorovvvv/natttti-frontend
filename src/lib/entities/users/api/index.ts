import { PocketBaseApi, type AddressesResponse, type SocialsResponse, type UsersResponse } from '$shared/api/pocketbase'
import { QueryBase } from '$shared/lib/Query'

export * from './create'

export class UsersApi extends PocketBaseApi {
	async getAddress(userId: string) {
		const res = await this.client.collection('users').getOne<
			UsersResponse<{
				address?: AddressesResponse
			}>
		>(userId, {
			fetch: this.fetch,
			expand: 'address',
			fields: 'expand,expand.address'
		})
		return res.expand?.address ?? null
	}

	async getSocials(userId: string) {
		const res = await this.client.collection('users').getOne<
			UsersResponse<{
				socials?: SocialsResponse
			}>
		>(userId, {
			fetch: this.fetch,
			expand: 'socials',
			fields: 'expand,expand.socials'
		})

		return res.expand?.socials ?? null
	}
}

export class UsersQueries {
	static getSocials = new QueryBase('users.getSocials', async (userId: string) => {
		return await new UsersApi().getSocials(userId)
	})
	static getAddress = new QueryBase('users.getAddress', async (userId: string) => {
		return await new UsersApi().getAddress(userId)
	})
}
