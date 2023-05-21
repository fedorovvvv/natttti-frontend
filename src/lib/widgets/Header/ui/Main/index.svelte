<script lang='ts'>
	import { Logo } from '$entities/Logo';
	import Button from '@smui/button'
	interface $$Props {
		class?:string
	}
	
	let className = ''
	export { className as class }
	
</script>

<header class={`Header ${className}`}>
	<Logo class='Header__logo'/>
	<Button href='/account/login' variant='unelevated'>
		Вход
	</Button>
</header>

<style lang='sass'>
	.Header
		width: 100%
		padding: 16px var(--containerPadding)
		box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1), inset 0px 1px 0px rgba(233, 233, 233, 0.5)
		display: flex
		align-items: center
		justify-content: space-between
		&__logo
			@at-root :global &
				display: block
				font-size: 24px
				font-weight: 700
</style>