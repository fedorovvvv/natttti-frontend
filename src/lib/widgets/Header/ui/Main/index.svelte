<script lang='ts'>
	import { Logo } from '$entities/Logo';
	import { Auth } from '$shared/lib/Auth';
	import { session } from '$shared/stores/session';
	import Button from '@smui/button'
	interface $$Props {
		class?:string
	}
	
	let className = ''
	export { className as class }

	const handler = {
		logoutClick() {
			Auth.logout()
		}
	}
	
</script>

<header class={`Header ${className}`}>
	<Logo class='Header__logo'/>
	{#if $session.accessToken}
		<Button variant='unelevated' on:click={handler.logoutClick}>
			Выход
		</Button>
	{:else}
		<Button href='/account/login' variant='unelevated'>
			Вход
		</Button>
	{/if}
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