<script lang='ts'>
	import { EasterEggs } from "$features/EasterEggs";
	import { QueryClientProvider } from "@tanstack/svelte-query";
	import dayjs from "dayjs";
	import ru from "dayjs/locale/ru";

	export let data

	dayjs.locale('ru', ru)
</script>

<EasterEggs/>
<QueryClientProvider client={data.queryClient}>
	<slot/>
</QueryClientProvider>