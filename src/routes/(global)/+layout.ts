import type { Load } from '@sveltejs/kit'
import { QueryClient } from '@tanstack/svelte-query'
import { browser } from '$app/environment'

export const load: Load = async () => {
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
