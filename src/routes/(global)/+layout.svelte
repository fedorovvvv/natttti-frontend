<script lang="ts">
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import dayjs from 'dayjs';
	import ru from 'dayjs/locale/ru';
	import { userStore } from '$appLayer/stores/user';
	import { EasterEggs } from '$features/EasterEggs';
	import { Toaster } from '$shared/ui/Notification';
	import type { LayoutData } from './$types';
	import { browser } from '$app/environment';

	export let data: LayoutData;

	$: userStore.set(data.user);

	dayjs.locale('ru', ru);

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser
			}
		}
	});
</script>

<Toaster />
<EasterEggs />
<QueryClientProvider client={queryClient}>
	<slot />
</QueryClientProvider>
