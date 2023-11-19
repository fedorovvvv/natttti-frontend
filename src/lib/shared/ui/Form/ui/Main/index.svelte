<script lang='ts'>
	import type { enhance } from "$app/forms";
	import type { HTMLFormAttributes } from "svelte/elements";

	type FormParams = HTMLFormAttributes
	
	interface $$Props extends FormParams {
		class?:string
		enhanceFn?:Parameters<typeof enhance>[1]
	}
	
	let className = ''
	export { className as class }
	export let enhanceFn:$$Props['enhanceFn'] = undefined
	
</script>

<form
	class={`Form ${className}`}
	on:submit
	{...$$restProps}
>
	{#if $$slots.header}
		<div class="Form__header">
			<slot name='header'/>
		</div>
	{/if}
	<div class="Form__main">
		<slot/>
	</div>
	{#if $$slots.button}
		<div class="Form__button">
			<slot name='button'/>
		</div>
	{/if}
	{#if $$slots.links}
		<div class='Form__links'>
			<slot name='links'/>
		</div>
	{/if}
</form>

<style lang='sass'>
	.Form
		--gap: 16px
		display: grid
		grid-template-columns: 1fr
		gap: 20px
		&__header
			width: 100%
			padding-bottom: 20px
			border-bottom: 1px solid var(--clue-color-gray-100)
		&__button
			width: 100%
			display: flex
			align-items: center
			gap: 10px
			flex-wrap: wrap
			& > *, .mdc-button
				@at-root :global &
					width: 100%
					flex: 1 0 200px
		&__links
			border-top: 1px solid var(--clue-color-gray-100)
			padding-top: 20px
			width: 100%
			text-align: center
</style>