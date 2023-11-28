<script lang="ts">
	import { UsersFeatureSocials } from '$features/users'
	import { SocialsSchema } from '$entities/socials'
	import type { SocialsRecord } from '$shared/api/pocketbase'

	export let data

	const socials = (data.socials ?? SocialsSchema.record.getDefault()) as SocialsRecord
</script>

{#if socials && data.user}
	<UsersFeatureSocials.Update userId={data.user.id} initialData={socials} />
{/if}
