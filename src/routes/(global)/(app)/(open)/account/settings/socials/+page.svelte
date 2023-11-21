<script lang='ts'>
	import { UsersSocialsUpdate } from "$features/users/socials/ui";

	export let data

</script>
{#if data.socials && data.user}
	<UsersSocialsUpdate userId={data.user.id} initialData={data.socials}/>
{/if}
