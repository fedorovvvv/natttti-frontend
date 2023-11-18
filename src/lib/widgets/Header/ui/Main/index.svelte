<script lang='ts'>
	import { applyAction, enhance } from '$app/forms';
	import { userStore } from '$appLayer/stores/user';
	import { Logo } from '$entities/Logo';
	import { pb } from '$shared/api/pocketbase';
	import { HeaderMenu } from '$widgets/Header';
	import Button from '@smui/button'
	interface $$Props {
		class?:string
	}
	
	let className = ''
	export { className as class }
	
</script>

<header class={`Header ${className}`}>
	<Logo class='Header__logo'/>
	<div class="Header__container">
		<HeaderMenu/>
	</div>
	{#if $userStore.current?.username}
		<code class='Header__user'><small>[{$userStore.current?.username}]</small></code>
	{/if}
	<div class="Header__buttons">
		{#if $userStore.isLoggedIn}
			<form
				method="POST"
				action="/users/logout"
				use:enhance={() => {
					return async ({ result }) => {
						pb.authStore.clear()
						await applyAction(result)
					}
				}}
			>
				<Button variant='unelevated'>
					Выход
				</Button>
			</form>
		{:else}
			<Button href='/users/login' variant='unelevated'>
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
		&__logo
			@at-root :global &
				flex: none
				display: block
				margin-right: 20px
				font-size: 24px
				font-weight: 700
		&__buttons
			flex: none
		&__user
			margin-right: 20px
</style>