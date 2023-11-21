<script lang='ts'>
	import { userStore } from "$appLayer/stores/user";
	import { UsersQueries } from "$entities/users/index.js";
	import { UsersSocialsUpdate } from "$features/users/socials/ui";
	import type { SocialsResponse } from "$shared/api/pocketbase";
	import { createQuery } from "@tanstack/svelte-query";

	export let data

	const socialsQuery = createQuery({
		queryKey: UsersQueries.getSocials.createKey($userStore.current!.id),
		queryFn: async (data) => UsersQueries.getSocials.queryFn(data),
		initialData: data.socials as SocialsResponse
	})

</script>
{#if data.user && $socialsQuery.isSuccess && $socialsQuery.data}
	<UsersSocialsUpdate userId={data.user.id} initialData={$socialsQuery.data}/>
{/if}
