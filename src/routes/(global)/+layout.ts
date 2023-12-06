import { QueryClient } from '@tanstack/svelte-query'
import { pb } from '$shared/api/pocketbase'
import { browser } from '$app/environment'

export const load = async () => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 1000 * 10, //10s stale (cache)
				enabled: browser
			}
		}
	})
	return {
		queryClient
	}
}
