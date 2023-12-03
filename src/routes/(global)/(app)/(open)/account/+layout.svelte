<script lang="ts">
	import type { ComponentProps } from 'svelte'
	import { AccountNav } from '$widgets/account'
	import { userStore } from '$entities/users'
	import { SectionContainer, SectionTitle } from '$shared/ui/Section'

	interface $$Props {
		class?: string
	}

	let className = ''
	export { className as class }

	const navItems: ComponentProps<AccountNav>['items'] = [
		{
			id: 'data',
			name: 'Данные',
			href: '/account/settings/base'
		},
		{
			id: 'socials',
			name: 'Соц. сети',
			href: '/account/settings/socials'
		},
		{
			id: 'addresses',
			name: 'Адрес',
			href: '/account/settings/address'
		}
	]
</script>

<main class={`account-layout ${className}`}>
	<SectionContainer>
		<SectionTitle>
			<h1>Hello {$userStore.current?.username}✏️</h1>
		</SectionTitle>
		<div class="account-layout__grid">
			<aside class="account-layout__aside">
				<AccountNav items={navItems} />
			</aside>
			<slot />
		</div>
	</SectionContainer>
</main>

<style lang="sass">
    .account-layout
        padding-top: 100px
        &__grid
            display: grid
            grid-template-columns: 200px 1fr
            gap: 20px
            @media (max-width: 740px)
                display: block
        &__aside
            padding: 10px 0
            @media (max-width: 740px)
                padding: 0
                margin-bottom: 10px
</style>
