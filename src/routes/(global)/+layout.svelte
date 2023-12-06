<script lang="ts">
	import { QueryClientProvider } from '@tanstack/svelte-query'
	import dayjs from 'dayjs'
	import ru from 'dayjs/locale/ru'
	import { EasterEggs } from '$features/EasterEggs'
	import { pb } from '$shared/api/pocketbase/instance.js'
	import { Toaster } from '$shared/ui/Toaster'

	export let data

	dayjs.locale('ru', ru)
	pb.authStore.loadFromCookie(document.cookie)
</script>

<Toaster />
<EasterEggs />
<QueryClientProvider client={data.queryClient}>
	<slot />
</QueryClientProvider>
