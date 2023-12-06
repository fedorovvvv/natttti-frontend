import { QueryClient } from '@tanstack/svelte-query'
import { pb } from '$shared/api/pocketbase'
import { browser } from '$app/environment'

export const load = async () => {
	if (browser) {
		pb.authStore.loadFromCookie(document.cookie)
	}
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
