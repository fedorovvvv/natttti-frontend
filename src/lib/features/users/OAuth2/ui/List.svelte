<script lang="ts">
	interface $$Props {
		class?: string
	}

	let className = ''
	export { className as class }
</script>

<div class={`UsersOAuth2List ${className}`}>
	<slot />
</div>

<style lang="sass">
    .UsersOAuth2List
        display: flex
        justify-content: center
        gap: 10px
</style>
