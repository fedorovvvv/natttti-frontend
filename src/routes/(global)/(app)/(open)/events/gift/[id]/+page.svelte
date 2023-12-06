<script lang="ts">
	import { GiftEventsFeature } from '$features/giftEvents'
	import { SectionContainer, SectionTitle } from '$shared/ui/Section'

	export let data
</script>

<SectionContainer>
	<GiftEventsFeature.Card giftEventId={data.id} initialData={data.giftEvent} />
</SectionContainer>
