import { createQuery } from '@tanstack/svelte-query'
import { pb } from '$shared/api/pocketbase'

export const createUserApi = () => {
	const collection = pb.collection('users')
	const user = createQuery({
		queryKey: ['user'],
		queryFn: async () => {
			return await collection.getOne('')
		}
	})
	return {
		collection
	}
}
