<script lang='ts'>
	import { Token, TokenFields } from "$entities/Token";
	import { CONFIG } from "$shared/config";
	import { TokenAccessTypes, type IToken } from "$shared/types/token";
	import { Box } from "$shared/ui/Box";
	import Button, {Group} from "@smui/button";
	import { writable } from "svelte/store";
	import {  slide } from "svelte/transition";

	interface $$Props {
		class?:string
	}
	
	let className = ''
	export { className as class }

	const state = writable({
		create: false
	})

	const controller = {
		createToggle(newState = !$state.create) {
			$state.create = newState
		}
	}

	const tokens:IToken[] = [
		{
            id: 0,
            issuedAt: new Date().toString(),
            expiresAt: new Date().toString(),
            grantedTo: new Date().toString(),
            accessToken: 'qwertyuiopasdfghjklzxcvbnm,',
            accessType: TokenAccessTypes.Admin,

        }
	]

	const handler = {
		toCreateClick() {
			controller.createToggle()
		},
		cancelCreateClick() {
			controller.createToggle(false)
		}
	}
	
</script>

<div class={`Tokens ${className}`}>
	{#if !$state.create}
		<div class="Tokens__header" transition:slide|local={CONFIG.TRANSITION}>
			<Button variant='unelevated' on:click={handler.toCreateClick}>
				Создать
			</Button>
		</div>
	{/if}
	{#if $state.create}
		<div class="Tokens__create" transition:slide|local={CONFIG.TRANSITION}>
			<Box size='m'>
				<TokenFields>
					<svelte:fragment slot='button'>
						<Group variant='unelevated'>
							<Button variant='unelevated' color='secondary' on:click={handler.cancelCreateClick}>
								Отмена
							</Button>
							<Button variant='unelevated'>
								Создать
							</Button>
						</Group>
					</svelte:fragment>
				</TokenFields>
			</Box>
		</div>
	{/if}
	{#if tokens.length}
		<ul class='Tokens__list'>
			{#each tokens as token (token.id)}
				<Token tag='li' data={token}/>
			{/each}
		</ul>
	{/if}
</div>

<style lang='sass'>
	.Tokens
		&__list
			margin-top: 30px
</style>