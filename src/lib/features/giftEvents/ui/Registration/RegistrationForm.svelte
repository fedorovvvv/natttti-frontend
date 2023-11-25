<script lang="ts">
	import Button from '@smui/button'
	import { createMutation, useQueryClient } from '@tanstack/svelte-query'
	import { type ComponentProps, type ComponentEvents, createEventDispatcher } from 'svelte'
	import type { GiftEventMembersResponse, GiftEventsResponse } from '$shared/api/pocketbase'
	import { Form } from '$shared/ui/Form'
	import RegistrationFields from './RegistrationFields.svelte'
	import { applyAction, deserialize } from '$app/forms'

	interface $$Props {
		class?: string
		giftEventId: string
	}

	interface $$Events {
		success: CustomEvent<{
			member: GiftEventMembersResponse
			giftEvent: GiftEventsResponse
		}>
	}

	let className = ''
	export { className as class }
	export let giftEventId: $$Props['giftEventId']

	const dispatch = createEventDispatcher()

	let schemaResult: ComponentProps<RegistrationFields>['schemaResult']

	const client = useQueryClient()

	const mutation = createMutation({
		async mutationFn(form: HTMLFormElement) {
			if (!$schemaResult || $schemaResult.original.isError) throw new Error('error')
			await new Promise((res) => setTimeout(res, 1000))

			const response = await fetch(form.action, {
				method: 'POST',
				body: new FormData(form)
			})

			const result = deserialize<
				{
					member: GiftEventMembersResponse
					giftEvent: GiftEventsResponse
				},
				undefined
			>(await response.text())

			console.log(result)

			await applyAction(result)

			if (result.type === 'success' && result.data) {
				dispatch('success', result.data)
				return result.data
			} else {
				throw Error('Error update')
			}
		},
		onSuccess() {
			// client.setQueryData()
		}
	})

	const handler = {
		submit(e: ComponentEvents<Form>['submit']) {
			e.preventDefault()
			schemaResult?.show()
			$mutation.mutate(e.currentTarget as HTMLFormElement)
		}
	}
</script>

<Form method="POST" action={`/events/gift/${giftEventId}?/registration`} class={`GiftEventsRegistrationForm ${className}`} on:submit={handler.submit}>
	<RegistrationFields bind:schemaResult />
	<svelte:fragment slot="button">
		<Button variant="unelevated" disabled={$schemaResult?.isError || $mutation.isPending}>
			{#if $mutation.isPending}
				Записываем...
			{:else}
				Записаться
			{/if}
		</Button>
	</svelte:fragment>
</Form>
