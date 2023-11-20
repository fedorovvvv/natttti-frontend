<script lang="ts">
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import dayjs from 'dayjs';
	import ru from 'dayjs/locale/ru';
	import { EasterEggs } from '$features/EasterEggs';
	import { Toaster } from '$shared/ui/Notification';

	export let data;

	dayjs.locale('ru', ru);
</script>

<Toaster />
<EasterEggs />
<QueryClientProvider client={data.queryClient}>
	<slot />
</QueryClientProvider>
