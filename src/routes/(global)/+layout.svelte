<script lang='ts'>
	import type { LayoutData } from "./$types";
	import { EasterEggs } from "$features/EasterEggs";
	import { QueryClient, QueryClientProvider } from "@tanstack/svelte-query";
	import { userStore } from "$appLayer/stores/user";
	import { browser } from "$app/environment";
	import dayjs from "dayjs";
	import ru from "dayjs/locale/ru";

    export let data:LayoutData

	$: userStore.set(data.user)

	dayjs.locale('ru', ru)

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser
			}
		}
	})
</script>

<EasterEggs/>
<QueryClientProvider client={queryClient}>
	<slot/>
</QueryClientProvider>