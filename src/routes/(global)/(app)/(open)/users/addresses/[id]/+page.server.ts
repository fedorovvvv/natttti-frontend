import { fail } from '@sveltejs/kit'
import type { ClientResponseError } from 'pocketbase'
import { UsersApi } from '$entities/users'
import type { AddressesRecord } from '$shared/api/pocketbase'

export const actions = {
	createOrUpdate: async ({ locals, request, params, fetch }) => {
		const data = Object.fromEntries(await request.formData()) as unknown as AddressesRecord
		const collection = locals.pb.collection('addresses')
		const userId = params.id

		try {
			const userAddress = await new UsersApi(locals.pb, fetch).getAddress(userId)

			if (userAddress) {
				return await collection.update(userAddress.id, data)
			} else {
				const address = await collection.create(data, {
					expand: 'users(address)'
				})

				await locals.pb.collection('users').update(userId, {
					address: address.id
				})
				
				return address
			}
		} catch (_error) {
			console.error(_error)
			const error = _error as ClientResponseError
			return fail(error.status, error.data)
		}
	}
}
