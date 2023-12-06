<script lang="ts">
	interface $$Props {
		class?: string
	}

	let className = ''
	export { className as class }
</script>

<main class={`tokens-layout ${className}`}>
	<slot />
</main>

<style lang="sass">
    .tokens-layout
        padding-top: var(--main-padding)
</style>
