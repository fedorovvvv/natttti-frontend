<script lang="ts">
	interface $$Props {
		class?: string
		tag?: string
		size?: 'm'
	}

	let className = ''
	export { className as class }

	export let tag: $$Props['tag'] = 'div'
	export let size: $$Props['size'] = undefined
</script>

<svelte:element this={tag} class={`Box ${className}`} data-size={size}>
	<slot />
</svelte:element>

<style lang="sass">
	.Box
		border-radius: 12px
		border: 1px solid var(--clue-color-gray-10)
		padding: 20px
		&[data-size='m']
			padding: 10px var(--containerPadding)
</style>
