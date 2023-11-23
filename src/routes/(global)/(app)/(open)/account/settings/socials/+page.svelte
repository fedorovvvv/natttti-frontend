<script lang="ts">
	import { UsersSocialsUpdate } from '$features/users/socials/ui'
	import { SocialsSchema } from '$entities/socials/index.js'
	import type { SocialsRecord } from '$shared/api/pocketbase/types.js'

	export let data

	const socials = (data.socials ?? SocialsSchema.record.getDefault()) as SocialsRecord
</script>

{#if socials && data.user}
	<UsersSocialsUpdate userId={data.user.id} initialData={socials} />
{/if}
