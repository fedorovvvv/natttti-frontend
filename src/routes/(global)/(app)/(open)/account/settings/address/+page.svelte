<script lang="ts">
	import { UsersFeatureAddresses } from '$features/users/addresses'

	export let data
</script>

{#if data.user}
	<UsersFeatureAddresses.Update initialData={data.address} userId={data.user.id} />
{/if}
