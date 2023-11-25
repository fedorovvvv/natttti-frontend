<script lang="ts">
	import Button from '@smui/button'
	import { createMutation, useQueryClient } from '@tanstack/svelte-query'
	import type { ComponentEvents, ComponentProps } from 'svelte'
	import { writable } from 'svelte/store'
	import { SocialsUpdateFields } from '$entities/socials'
	import { userStore } from '$entities/users'
	import { UsersQueries } from '$entities/users'
	import type { SocialsRecord, SocialsResponse } from '$shared/api/pocketbase'
	import { Box } from '$shared/ui/Box'
	import { Form } from '$shared/ui/Form'
	import { applyAction, deserialize } from '$app/forms'

	interface $$Props {
		class?: string
		userId: string
		initialData: SocialsRecord
	}

	let className = ''
	export { className as class }
	export let userId: $$Props['userId']
	export let initialData: $$Props['initialData']

	const fields = writable(initialData)

	const client = useQueryClient()

	let validateResult: ComponentProps<SocialsUpdateFields>['validateResult']
	let isErrorVisible: ComponentProps<SocialsUpdateFields>['isErrorVisible']

	const socialsMutation = createMutation({
		mutationFn: async (form: HTMLFormElement) => {
			isErrorVisible?.set(true)
			if (!$validateResult || $validateResult?.isError) throw new Error('error')

			const response = await fetch(form.action, {
				method: 'POST',
				body: new FormData(form)
			})

			const result = deserialize<SocialsResponse, undefined>(await response.text())

			await applyAction(result)

			if (result.type === 'success') {
				return result.data
			} else {
				throw Error('Error update')
			}
		},
		onSuccess(newSocials) {
			if (!$userStore.current!.id) return

			client.setQueryData(UsersQueries.getSocials.createKey(userId), newSocials)
			userStore.setSocials(newSocials)
		}
	})

	const handler = {
		submit(event: ComponentEvents<Form>['submit']) {
			event.preventDefault()
			$socialsMutation.mutate(event.currentTarget as HTMLFormElement)
		}
	}
</script>

<Box class={`UsersSocialsUpdate ${className}`}>
	<Form method="POST" action={`/users/socials/${userId}?/createOrUpdate`} on:submit={handler.submit}>
		<SocialsUpdateFields {fields} bind:validateResult bind:isErrorVisible />
		<svelte:fragment slot="button">
			<Button variant="unelevated" disabled={$socialsMutation.isPending || $validateResult?.isError}>
				{#if $socialsMutation.isPending}
					Обновление...
				{:else}
					Обновить
				{/if}
			</Button>
		</svelte:fragment>
	</Form>
</Box>
