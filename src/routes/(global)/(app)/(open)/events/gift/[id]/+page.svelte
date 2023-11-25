<script lang="ts">
	import { GiftEventsFeature } from '$features/giftEvents'
	import { SectionContainer, SectionTitle } from '$shared/ui/Section'
	import { dev } from '$app/environment'
	import { invalidateAll } from '$app/navigation'

	export let data

	const handler = {
		success() {
			invalidateAll()
		}
	}
</script>

<SectionContainer>
	<SectionTitle>
		{#if dev}
			<GiftEventsFeature.Card
				on:success={handler.success}
				data={data.giftEvent}
				isAllow={data.isAllow}
			/>
		{:else}
			<h1>Скоро будет🎅🏻</h1>
		{/if}
	</SectionTitle>
</SectionContainer>
