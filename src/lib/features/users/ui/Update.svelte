<script lang="ts">
	import Button from '@smui/button'
	import Textfield from '@smui/textfield'
	import type { ActionResult } from '@sveltejs/kit'
	import { createMutation } from '@tanstack/svelte-query'
	import type { ComponentEvents } from 'svelte'
	import { derived, writable } from 'svelte/store'
	import { userStore } from '$entities/users'
	import { usersLogoutEnhance } from '$entities/users'
	import { UsersSchema } from '$entities/users/model/schema'
	import type { UsersRecord, UsersResponse } from '$shared/api/pocketbase'
	import { validateSchema } from '$shared/lib/validation'
	import { Box } from '$shared/ui/Box'
	import { Form, FormCol, FormRow } from '$shared/ui/Form'
	import { applyAction, deserialize, enhance } from '$app/forms'

	interface $$Props {
		class?: string
	}

	let className = ''
	export { className as class }

	const updateResult = writable<ActionResult<UsersRecord> | undefined>(undefined)
	const isErrorVisible = writable(false)
	const userSchema = UsersSchema.base

	const fields = writable(userStore.clone()!)

	const userSchemaResult = derived([fields, isErrorVisible], ([$fields, $isErrorVisible]) => {
		const res = validateSchema(userSchema, $fields)
		if (!$isErrorVisible) {
			res.isError = false
			res.errors = {}
		}
		return res
	})

	const userUpdateMutation = createMutation({
		async mutationFn(form: HTMLFormElement) {
			isErrorVisible.set(true)
			if ($userSchemaResult.isError) throw new Error('error')

			const response = await fetch(form.action, {
				method: 'POST',
				body: new FormData(form)
			})

			const result = deserialize<UsersResponse, undefined>(await response.text())
			updateResult.set(result)

			await applyAction(result)

			if (result.type === 'success') {
				return result.data
			} else {
				throw Error('Error update')
			}
		},
		onSuccess(newData) {
			userStore.set(newData)
		}
	})

	const handler = {
		async submit(event: ComponentEvents<Form>['submit']) {
			event.preventDefault()
			$userUpdateMutation.mutate(event.currentTarget as HTMLFormElement)
		}
	}
</script>

<Box class={`UsersUpdate ${className}`}>
	<Form method="POST" action={`/users/update/${$userStore.current?.id}`} on:submit={handler.submit}>
		<FormCol>
			<FormRow>
				<Textfield
					invalid={!!$userSchemaResult.errors.username}
					bind:value={$fields.username}
					required
					input$name="username"
					variant="outlined"
					label="Username"
				/>
			</FormRow>
			<FormRow>
				<Textfield
					invalid={!!$userSchemaResult.errors.firstName}
					bind:value={$fields.firstName}
					required
					input$name="firstName"
					variant="outlined"
					label="Имя"
				/>
				<Textfield
					invalid={!!$userSchemaResult.errors.lastName}
					bind:value={$fields.lastName}
					required
					input$name="lastName"
					variant="outlined"
					label="Фамилия"
				/>
			</FormRow>
			<FormRow>
				<Textfield
					invalid={!!$userSchemaResult.errors.email}
					bind:value={$fields.email}
					disabled
					input$name="email"
					variant="outlined"
					type="email"
					label="Email"
				/>
			</FormRow>
		</FormCol>
		<svelte:fragment slot="button">
			<Button
				variant="unelevated"
				disabled={$userUpdateMutation.isPending || $userSchemaResult.isError}
			>
				{#if $userUpdateMutation.isPending}
					Обновление...
				{:else if $updateResult?.type === 'failure'}
					Упс, чет не то
				{:else}
					Обновить
				{/if}
			</Button>
			<form method="POST" use:enhance={usersLogoutEnhance} action="/users/logout">
				<Button variant="outlined">Выйти</Button>
			</form>
		</svelte:fragment>
	</Form>
</Box>

<style lang="sass">
    .UsersUpdate
</style>
