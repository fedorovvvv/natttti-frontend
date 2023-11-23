import type { Load } from '@sveltejs/kit'
import dayjs from 'dayjs'
import { StatsRequests } from '$shared/api/stats'

export const load: Load = async ({ fetch }) => {
	const statsRequests = new StatsRequests(undefined, fetch)

	return {
		streamed: {
			stats: statsRequests.get({
				from: dayjs().add(-30, 'day').toISOString(),
				to: dayjs().toISOString()
			})
		}
	}
}
