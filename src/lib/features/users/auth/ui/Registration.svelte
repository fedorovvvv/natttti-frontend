<script lang="ts">
	import Button from '@smui/button'
	import Textfield from '@smui/textfield'
	import type { ActionResult } from '@sveltejs/kit'
	import { createMutation } from '@tanstack/svelte-query'
	import type { ComponentEvents } from 'svelte'
	import { derived, writable } from 'svelte/store'
	import { UsersOAuth2GitHub, UsersOAuth2List } from '$features/users/OAuth2'
	import { UsersSchema } from '$entities/users'
	import { validateSchema } from '$shared/lib/validation'
	import { Box } from '$shared/ui/Box'
	import { Form, FormCol, FormRow } from '$shared/ui/Form'
	import Link from '$shared/ui/Link/Link.svelte'
	import { applyAction, deserialize } from '$app/forms'

	interface $$Props {
		class?: string
	}

	let className = ''
	export { className as class }
	const isErrorVisible = writable(false)
	const registrationResult = writable<ActionResult | undefined>(undefined)

	const userSchema = UsersSchema.create

	const fields = writable(userSchema.getDefault())

	const userSchemaResult = derived([fields, isErrorVisible], ([$fields, $isErrorVisible]) => {
		const res = validateSchema(userSchema, $fields)
		if (!$isErrorVisible) {
			res.isError = false
			res.errors = {}
		}
		return res
	})

	const registrationMutation = createMutation({
		async mutationFn(form: HTMLFormElement) {
			isErrorVisible.set(true)
			if ($userSchemaResult.isError) throw new Error('error')

			const response = await fetch(form.action, {
				method: 'POST',
				body: new FormData(form)
			})

			const result = deserialize(await response.text())

			registrationResult.set(result)

			await applyAction(result)

			if (result.type !== 'success') {
				throw new Error('Registration error')
			}
		}
	})

	const handler = {
		async submit(event: ComponentEvents<Form>['submit']) {
			event.preventDefault()
			$registrationMutation.mutate(event.currentTarget as HTMLFormElement)
		}
	}
</script>

<Box class={`UsersAuthRegistration ${className}`}>
	<Form method="POST" action="/users/signup" on:submit={handler.submit}>
		<UsersOAuth2List slot="header">
			<UsersOAuth2GitHub />
		</UsersOAuth2List>
		<FormCol>
			<FormRow>
				<Textfield
					invalid={!!$userSchemaResult.errors.username}
					bind:value={$fields.username}
					required
					input$name="username"
					variant="outlined"
					type="text"
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
					type="text"
					label="Имя"
				/>
				<Textfield
					invalid={!!$userSchemaResult.errors.lastName}
					bind:value={$fields.lastName}
					required
					input$name="lastName"
					variant="outlined"
					type="text"
					label="Фамилия"
				/>
			</FormRow>
			<FormRow>
				<Textfield
					invalid={!!$userSchemaResult.errors.password}
					bind:value={$fields.password}
					required
					input$name="password"
					variant="outlined"
					type="password"
					label="Пароль"
				/>
			</FormRow>
			<FormRow>
				<Textfield
					invalid={!!$userSchemaResult.errors.passwordConfirm}
					bind:value={$fields.passwordConfirm}
					required
					input$name="passwordConfirm"
					variant="outlined"
					type="password"
					label="Пароль точно такой?"
				/>
			</FormRow>
		</FormCol>
		<svelte:fragment slot="button">
			<Button
				variant="unelevated"
				disabled={$registrationMutation.isPending || $userSchemaResult.isError}
			>
				{#if $registrationMutation.isPending}
					Записываем...
				{:else if $registrationResult?.type === 'failure'}
					Упс, чет не то
				{:else}
					Записаться
				{/if}
			</Button>
		</svelte:fragment>
		<Link href="/users/login" slot="links">Вход</Link>
	</Form>
</Box>
