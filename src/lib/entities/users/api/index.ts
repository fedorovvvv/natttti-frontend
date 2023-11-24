import { pb, type SocialsResponse, type UsersResponse } from '$shared/api/pocketbase'
import { QueryBase } from '$shared/lib/Query'

export * from './create'
export * from './collection'

export class UsersApi {
	static async getSocials(userId: string, client = pb) {
		const res = await client.collection('users').getOne(userId, {
			expand: 'socials',
			fields: 'expand,expand.socials'
		}) as Pick<
			UsersResponse<{
				socials: SocialsResponse
			}>,
			'expand'
		>
		return res.expand?.socials
	}
}

export class UsersQueries {
	static getSocials = new QueryBase(
		'usersGetSocials',
		async (...data: Parameters<typeof UsersApi.getSocials>) => {
			return await UsersApi.getSocials(...data)
		}
	)
}
