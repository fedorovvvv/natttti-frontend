<script lang="ts">
	import Button from '@smui/button'
	import type { SubmitFunction } from '@sveltejs/kit'
	import { createEventDispatcher } from 'svelte'
	import type { GiftEventsResponse } from '$shared/api/pocketbase'
	import { applyAction, enhance } from '$app/forms'

	interface $$Props {
		class?: string
		giftEventId: string
	}
	
	interface $$Events {
		success: CustomEvent<GiftEventsResponse>
	}

	let className = ''
	export { className as class }
	export let giftEventId: $$Props['giftEventId']

	const dispatch = createEventDispatcher()

	const enhanceFn:SubmitFunction<GiftEventsResponse> = async () => {
		return async ({result}) => {
			if (result.type === 'success') {
				dispatch('success', result.data!)
			}
			
			await applyAction(result)
		}
	}

</script>

<form method="POST" action={`/events/gift/${giftEventId}?/exit`} use:enhance={enhanceFn} class={`GiftEventsExit ${className}`}>
	<Button variant="unelevated" color="secondary">Выйти из события</Button>
</form>
