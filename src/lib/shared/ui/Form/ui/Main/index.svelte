<script lang='ts'>
	interface $$Props {
		class?:string
	}
	
	let className = ''
	export { className as class }
	
</script>

<form class={`Form ${className}`} on:submit|preventDefault>
	<div class="Form__main">
		<slot/>
	</div>
	{#if $$slots.button}
		<div class="Form__button">
			<slot name='button'/>
		</div>
	{/if}
</form>

<style lang='sass'>
	.Form
		--gap: 16px
		&__button
			width: 100%
			margin-top: 20px
			& > *
				@at-root :global &
					width: 100%
					flex: 1
</style>