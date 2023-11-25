<script lang="ts">
	import Button from '@smui/button'
	import { enhance } from '$app/forms'

	interface $$Props {
		class?: string
		giftEventId: string
	}

	let className = ''
	export { className as class }
	export let giftEventId: $$Props['giftEventId']
</script>

<form method="POST" action={`/events/gift/${giftEventId}?/exit`} use:enhance class={`GiftEventsExit ${className}`}>
	<Button variant="unelevated" color="secondary">Выйти из события</Button>
</form>
