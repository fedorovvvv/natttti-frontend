<script lang="ts">
	interface $$Props {
		class?: string
	}

	let className = ''
	export { className as class }
</script>

<div class={`FormRow ${className}`}>
	<slot />
</div>

<style lang="sass">
    .FormRow
        display: grid
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr))
        gap: var(--gap)
</style>
