<script lang='ts'>
	import type { LayoutData } from "./$types";
	import { EasterEggs } from "$features/EasterEggs";
	import { QueryClient, QueryClientProvider } from "@tanstack/svelte-query";
	import { userStore } from "$appLayer/stores/user";

    export let data:LayoutData

	$: userStore.set(data.user)

	const queryClient = new QueryClient()
	$: console.log({
		$userStore
	})
</script>

<EasterEggs/>
<QueryClientProvider client={queryClient}>
	<slot/>
</QueryClientProvider>