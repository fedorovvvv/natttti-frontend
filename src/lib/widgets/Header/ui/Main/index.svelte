<script lang='ts'>
	import { Logo } from '$entities/Logo';
	import { Auth } from '$shared/lib/Auth';
	import { session } from '$shared/stores/session';
	import { HeaderMenu } from '$widgets/Header';
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
	<div class="Header__container">
		<HeaderMenu/>
	</div>
	<div class="Header__buttons">
		{#if $session.accessToken}
			<Button variant='unelevated' on:click={handler.logoutClick}>
				Выход
			</Button>
		{:else}
			<Button href='/account/login' variant='unelevated'>
				Вход
			</Button>
		{/if}
	</div>
</header>

<style lang='sass'>
	.Header
		width: 100%
		padding: 16px var(--containerPadding)
		box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1), inset 0px 1px 0px rgba(233, 233, 233, 0.5)
		display: flex
		align-items: center
		&__container
			flex: 1
			display: flex
			justify-content: center
		&__logo
			@at-root :global &
				flex: none
				display: block
				font-size: 24px
				font-weight: 700
		&__buttons
			flex: none
</style>