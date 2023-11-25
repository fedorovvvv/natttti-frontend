<script lang="ts">
	import Button from '@smui/button'
	import type { ComponentProps } from 'svelte'
	import RegistrationDialog from './RegistrationDialog.svelte'

	interface $$Props extends ComponentProps<Button> {
		class?: string
		giftEventId: string
	}

	let className = ''
	export { className as class }
	export let giftEventId: $$Props['giftEventId']
</script>

<RegistrationDialog {giftEventId} on:success>
	<svelte:fragment slot="trigger" let:trigger>
		<Button class={`GiftEventsRegistration ${className}`} use={[trigger.action]} {...$$restProps}>Регистрация</Button>
	</svelte:fragment>
</RegistrationDialog>
