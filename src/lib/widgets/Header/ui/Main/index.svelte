<script lang="ts">
	import Button from '@smui/button'
	import { HeaderLink, HeaderLinkList, HeaderMenu } from '$widgets/Header'
	import { Logo } from '$entities/Logo'
	import { userStore } from '$entities/users'
	interface $$Props {
		class?: string
	}

	let className = ''
	export { className as class }
</script>

<header class={`Header ${className}`}>
	<Logo class="Header__logo" />
	<div class="Header__container">
		<HeaderMenu />
	</div>
	<div class="Header__tail">
		<div class="Header__buttons">
			{#if $userStore.isLoggedIn}
				<Button variant="outlined" href="/account">
					<span class='Header__username-text'>{$userStore.current?.username}</span>
				</Button>
			{:else}
				<Button href="/users/login" variant="unelevated">Вход</Button>
			{/if}
		</div>
		<hr />
		<HeaderLinkList>
			<HeaderLink href="https://github.com/fedorovvvv/natttti-frontend" target="_blank" rel="noreferrer">
				<img src="https://raw.githubusercontent.com/rdimascio/icons/master/icons/github.svg" alt="github" />
			</HeaderLink>
		</HeaderLinkList>
	</div>
</header>

<style lang="sass">
	.Header
		width: 100%
		padding: 16px var(--containerPadding)
		box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1), inset 0px 1px 0px rgba(233, 233, 233, 0.5)
		display: flex
		align-items: center
		@media (max-width: 540px)
			padding-top: 12px
			padding-bottom: 12px
		&__container
			flex: 1
			display: flex
			padding: 0 10px
		&__logo
			@at-root :global &
				flex: none
				display: block
				margin-right: 10px
		&__tail
			margin-left: auto
			display: flex
			align-items: center
			hr
				display: block
				border: none
				height: 20px
				width: 1px
				background: var(--clue-color-gray-100)
				margin: auto 12px
				@media (max-width: 540px)
					display: none
		&__buttons
			display: flex
			align-items: center
			gap: 20px
		&__username
			&-text
				@media (max-width: 540px)
					width: 50px
					overflow: hidden
					text-overflow: ellipsis
		&__user
			margin-right: 20px
		:global(.HeaderLinkList)
			@media (max-width: 540px)
				display: none
</style>
