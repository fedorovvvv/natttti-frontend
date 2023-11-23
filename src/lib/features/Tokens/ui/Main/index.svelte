<script lang="ts">
	import { Token, TokenFields } from '$entities/Token'
	import { TokensCreate } from '$features/Tokens'
	import { CONFIG } from '$shared/config'
	import type { IToken } from '$shared/types/token'
	import { Box } from '$shared/ui/Box'
	import Button, { Group } from '@smui/button'
	import type { ComponentEvents } from 'svelte'
	import { writable } from 'svelte/store'
	import { slide } from 'svelte/transition'

	interface $$Props {
		class?: string
		items: IToken[]
	}

	let className = ''
	export { className as class }

	export let items: $$Props['items'] = []

	const state = writable({
		create: false
	})

	const controller = {
		createToggle(newState = !$state.create) {
			$state.create = newState
		},
		add(token: IToken) {
			items = [token, ...items]
		},
		remove(id: IToken['id']) {
			items = items.filter((item) => item.id !== id)
		},
		update(token: IToken) {
			items = items.map((item) => {
				if (item.id === token.id) {
					item = {
						...item,
						...token
					}
				}
				return item
			})
		}
	}

	const handler = {
		toCreateClick() {
			controller.createToggle()
		},
		createCancel() {
			controller.createToggle(false)
		},
		tokenCreate(e: ComponentEvents<TokensCreate>['create']) {
			const { token, clean } = e.detail
			clean()
			controller.createToggle(false)
			controller.add(token)
		},
		tokenRemove(e: ComponentEvents<Token>['remove']) {
			const { data } = e.detail
			controller.remove(data.id)
		},
		tokenUpdate(e: ComponentEvents<Token>['update']) {
			const { data } = e.detail
			controller.update(data)
		}
	}

	$: sortedItems = items.sort(({ issuedAt: a }, { issuedAt: b }) => +new Date(b) - +new Date(a))
</script>

<div class={`Tokens ${className}`}>
	{#if !$state.create}
		<div class="Tokens__header" transition:slide|local={CONFIG.TRANSITION}>
			<Button variant="unelevated" on:click={handler.toCreateClick}>Создать</Button>
		</div>
	{/if}
	{#if $state.create}
		<div class="Tokens__create" transition:slide|local={CONFIG.TRANSITION}>
			<TokensCreate on:cancel={handler.createCancel} on:create={handler.tokenCreate} />
		</div>
	{/if}
	{#if items.length}
		<ul class="Tokens__list">
			{#each sortedItems as item (item.id)}
				<li class="Tokens__item" transition:slide|local={CONFIG.TRANSITION}>
					<Token data={item} on:remove={handler.tokenRemove} on:update={handler.tokenUpdate} />
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style lang="sass">
	.Tokens
		&__list
			margin-top: 30px
		&__item
			&:not(:last-child)
				margin-bottom: 20px
			.Token
				@at-root :global &
					width: 100%
</style>
