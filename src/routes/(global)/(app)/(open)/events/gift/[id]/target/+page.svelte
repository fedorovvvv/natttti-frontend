<script lang="ts">
	import { Box } from '$shared/ui/Box'
	import { RichContent } from '$shared/ui/RichContent'
	import { SectionContainer, SectionTitle } from '$shared/ui/Section'

	export let data

	$: targetUser = data.target.expand?.user
</script>

<SectionContainer>
	{#if targetUser}
		<SectionTitle>
			<h2>Записка для Санты от ✨{targetUser.firstName} {targetUser.lastName}✨</h2>
		</SectionTitle>
		<Box>
			<RichContent>
				{@html data.target.description}
			</RichContent>
		</Box>
	{/if}
</SectionContainer>
