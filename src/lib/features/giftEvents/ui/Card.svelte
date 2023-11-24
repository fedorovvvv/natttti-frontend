<script lang="ts">
	import type { ComponentProps } from 'svelte'
	import { GiftEventsCard } from '$entities/giftEvents'
	import Registration from './Registration/Registration.svelte'

	interface $$Props extends ComponentProps<GiftEventsCard> {
		class?: string
	}

	let className = ''
	export { className as class }
	export let data: $$Props['data']
</script>

<GiftEventsCard {data} class={`GiftEventsCard ${className}`}>
	<Registration variant="unelevated" slot="buttons">Регистрация</Registration>
</GiftEventsCard>
