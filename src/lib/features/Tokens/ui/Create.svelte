<script lang="ts">
	import { TokenFields } from '$entities/Token'
	import { TokenRequests } from '$shared/api/token'
	import { ETokenAccessTypes, type IToken } from '$shared/types/token'
	import { Box } from '$shared/ui/Box'
	import Button, { Group } from '@smui/button'
	import { createEventDispatcher, type ComponentProps } from 'svelte'
	import { writable } from 'svelte/store'

	interface $$Props {
		class?: string
	}

	interface $$Events {
		cancel: CustomEvent
		create: CustomEvent<{
			token: IToken
			clean: (typeof controller)['clean']
		}>
	}

	let className = ''
	export { className as class }

	const dispatch = createEventDispatcher()

	const state = writable({
		fetching: false
	})

	const defaultFields: Parameters<TokenRequests['create']>[0] = {
		accessType: ETokenAccessTypes.User,
		expiresAt: new Date(+new Date() + 60 * 60 * 24 * 90 * 1000),
		grantedTo: ''
	}

	const fields = writable<typeof defaultFields>(defaultFields)

	$: tokenRequests = new TokenRequests()

	const controller = {
		clean() {
			fields.set(defaultFields)
		},
		async create() {
			$state.fetching = true
			try {
				const res = await tokenRequests.create($fields)

				if (res._error) {
					throw new Error(res.title)
				}

				dispatch('create', {
					token: res,
					clean: this.clean
				})
			} catch (error) {
				console.error(error)
			} finally {
				$state.fetching = false
			}
		}
	}

	const handler = {
		cancelClick() {
			controller.clean()
			dispatch('cancel')
		},
		createClick() {
			controller.create()
		}
	}
</script>

<Box size="m" class={`TokensCreate ${className}`}>
	<TokenFields
		bind:accessType={$fields.accessType}
		bind:expiresAt={$fields.expiresAt}
		bind:grantedTo={$fields.grantedTo}
	>
		<svelte:fragment slot="button" let:valid>
			<Group variant="unelevated">
				<Button variant="unelevated" color="secondary" on:click={handler.cancelClick}>
					Отмена
				</Button>
				<Button
					variant="unelevated"
					on:click={handler.createClick}
					disabled={!valid || $state.fetching}
				>
					Создать
				</Button>
			</Group>
		</svelte:fragment>
	</TokenFields>
</Box>

<style lang="sass">
    .TokensCreate
</style>
