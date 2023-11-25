<script lang="ts">
	import type { ComponentProps } from 'svelte'
	import Dialog from '$shared/ui/Dialog/ui/Dialog.svelte'
	import RegistrationForm from './RegistrationForm.svelte'

	interface $$Props {
		class?: string
		giftEventId: string
		trigger?: ComponentProps<Dialog>['trigger']
	}

	let className = ''
	export { className as class }
	export let giftEventId: $$Props['giftEventId']

	let open: ComponentProps<Dialog>['open'] = undefined

	const handler = {
		success() {
			open?.set(false)
		}
	}
</script>

<Dialog class={`RegistrationDialog ${className}`} bind:open>
	<svelte:fragment slot="trigger" let:trigger>
		<slot name="trigger" {trigger} />
	</svelte:fragment>
	<svelte:fragment slot="title">Регистрация</svelte:fragment>
	<RegistrationForm {giftEventId} on:success={handler.success} on:success />
</Dialog>
