<script lang="ts">
	import { GiftEventsFeature } from '$features/giftEvents'
	import { SectionContainer, SectionTitle } from '$shared/ui/Section'
	import { dev } from '$app/environment'

	export let data
</script>

<SectionContainer>
	<SectionTitle>
		{#if dev}
			<GiftEventsFeature.Card data={data.giftEvent}/>
		{:else}
			<h1>Скоро будет🎅🏻</h1>
		{/if}
	</SectionTitle>
</SectionContainer>
