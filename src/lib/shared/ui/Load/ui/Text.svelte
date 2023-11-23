<script lang="ts">
	interface $$Props {
		class?: string
		tag?: string
	}

	let className = ''
	export { className as class }

	export let tag = 'span'
</script>

<svelte:element this={tag} class={`LoadText ${className}`}>
	<slot />
</svelte:element>

<style lang="sass">
    .LoadText
        font-size: 50px
        font-weight: 700
        color: var(--clue-color-gray-10)
        @media (max-width: $sm)
            font-size: 30px
</style>
