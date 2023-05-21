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

	interface $$Props {
		class?:string
		tag?:string
		data:IToken
	}
	
	let className = ''
	export { className as class }
	export let tag:$$Props['tag'] = 'div'
	export let data:$$Props['data']

	const state = writable({
		edit: false
	})

	const controller = {
		editToggle(newState = !$state.edit) {
			$state.edit = newState
		}
	}
	
	const handler = {
		editClick() {
			controller.editToggle()
		}
	}
</script>

<Box {tag} size='m' class={`Token ${className} ${$state.edit ? 'Token_edit' : ''}`}>
	<div class="Token__header">
		<CopyText text={data.accessToken}/>
		<div class="Token__controls">
			<IconButton size='button' on:click={handler.editClick}>
				<Icon class='material-icons'>
					edit
				</Icon>
			</IconButton>
			<IconButton size='button'>
				<Icon class='material-icons'>
					delete
				</Icon>
			</IconButton>
		</div>
	</div>
	{#if $state.edit}
		<div class="Token__footer" transition:slide|local={CONFIG.TRANSITION}>
			<TokenFields>
				<svelte:fragment slot='button'>
					<Button variant='unelevated'>
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