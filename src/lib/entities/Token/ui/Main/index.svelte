<script lang='ts'>
	import type { IToken } from "$shared/types/token";
	import { Box } from "$shared/ui/Box";
	import IconButton, { Icon } from '@smui/icon-button'
	import { CopyText } from "$shared/ui/CopyText";
	import { writable } from "svelte/store";
	import { TokenFields } from "$entities/Token";
	import {slide} from 'svelte/transition'
	import { CONFIG } from "$shared/config";
	import Button from "@smui/button/src/Button.svelte";
	import { TokenHelper } from "$shared/lib/TokenHelper";
	import { TokenRequests } from "$shared/api/token";
	import { session } from "$shared/stores/session";
	import { createEventDispatcher } from "svelte";

	interface $$Props {
		class?:string
		tag?:string
		data:IToken
	}

	interface $$Events {
		remove: CustomEvent<{
			data: $$Props['data']
		}>
		update: CustomEvent<{
			data: IToken
		}>
	}
	
	let className = ''
	export { className as class }
	export let tag:$$Props['tag'] = 'div'
	export let data:$$Props['data']

	const dispatch = createEventDispatcher()

	const state = writable({
		edit: false,
		fetching: false
	})

	const fields = writable<typeof data>({...data})
		
	$: fields.set({...data})

	$: tokenRequests = new TokenRequests($session.accessToken)

	const controller = {
		editToggle(newState = !$state.edit) {
			$state.edit = newState
			controller.clearEdit()
		},
		clearEdit() {
			fields.set({...data})
		},
		async remove() {
			if ($state.fetching) return
			$state.fetching = true
			controller.editToggle(false)
			try {
				const res = await tokenRequests.delete(+data.id)

				if (res._error) {
					throw new Error(res.title)
				}

				dispatch('remove', {
					data
				})

			} catch (error) {
				console.error(error)
			} finally {
				$state.fetching = false
			}
		},
		async update() {
			if ($state.fetching) return
			$state.fetching = true
			
			try {
				const res = await tokenRequests.update({
					...$fields
				})

				if (res._error) {
					throw new Error(res.title)
				}

				controller.editToggle(false)

				dispatch('update', {
					data: res
				})
			} catch (error) {
				console.error(error)
			} finally {
				$state.fetching = false
			}
		}
	}
	
	const handler = {
		editClick() {
			controller.editToggle()
		},
		removeClick() {
			controller.remove()
		},
		updateClick() {
			controller.update()
		}
	}

</script>

<Box {tag} size='m' class={`Token ${className} ${$state.edit ? 'Token_edit' : ''}`}>
	<div class="Token__header">
		<h3 class='Token__name'><small>{TokenHelper.getAccessTypeText(data.accessType)}</small>{data.grantedTo}</h3>
		<div class="Token__token">
			<CopyText text={data.accessToken}/>
			<small>До: {new Date(data.expiresAt).toLocaleDateString()}</small>
		</div>
		<div class="Token__controls">
			<IconButton size='button' on:click={handler.editClick}>
				<Icon class='material-icons'>
					edit
				</Icon>
			</IconButton>
			<IconButton size='button' on:click={handler.removeClick}>
				<Icon class='material-icons'>
					delete
				</Icon>
			</IconButton>
		</div>
	</div>
	{#if $state.edit}
		<div class="Token__footer" transition:slide|local={CONFIG.TRANSITION}>
			<TokenFields bind:expiresAt={$fields.expiresAt} bind:accessType={$fields.accessType} bind:grantedTo={$fields.grantedTo}>
				<svelte:fragment slot='button' let:valid>
					<Button variant='unelevated' disabled={!valid || $state.fetching} on:click={handler.updateClick}>
						Сохранить
					</Button>
				</svelte:fragment>
			</TokenFields>
		</div>
	{/if}
</Box>

<style lang='sass'>
	.Token
		$edit: #{&}_edit
		&__header
			display: flex
			align-items: center
			transition: .3s ease-in-out
			transition-property: padding
			@at-root :global #{$edit} &
				padding-bottom: 10px
		&__name
			display: block
			font-size: 16px
			width: 160px
			flex: none
			small
				display: block
				font-size: 12px
				color: var(--gray400)
		&__token
			color: var(--gray400)
			display: flex
			flex-direction: column
			align-items: flex-start
			.CopyText
				@at-root :global &
					display: block
					margin-right: 20px
			small
				font-size: 10px
				font-weight: 500
				margin-left: 10px
				margin-top: 5px
		&__controls
			margin-left: auto
			display: flex
			align-items: center
			& > *
				@at-root :global &
					&:not(:last-child)
						margin-right: 10px
					.material-icons
						color: var(--gray500)
		&__footer
			border-top: 1px solid var(--gray50)
			padding: 20px 10px
</style>