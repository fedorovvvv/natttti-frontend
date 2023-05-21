<script lang='ts'>
	import Button from '@smui/button'
	interface $$Props {
		class?:string
	}
	
	let className = ''
	export { className as class }
	
</script>

<header class={`Header ${className}`}>
	<a href="/" class='Header__logo'>nattttttti.</a>
	<Button>
		Вход
	</Button>
</header>

<style lang='sass'>
	.Header
		width: 100%
		padding: 20px var(--containerPadding)
		box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1), inset 0px 1px 0px rgba(233, 233, 233, 0.5)
		&__logo
			display: block
			font-size: 24px
			font-weight: 700
</style>