<script lang="ts">
	import Button from '@smui/button'
	import { createQuery } from '@tanstack/svelte-query'
	import type { ComponentProps } from 'svelte'
	import { GiftEventsCard, GiftEventsQueries } from '$entities/giftEvents'
	import { UsersApi, UsersQueries, userStore } from '$entities/users'
	import Exit from './Exit/Exit.svelte'
	import Registration from './Registration/Registration.svelte'

	interface $$Props extends ComponentProps<GiftEventsCard> {
		class?: string
	}

	let className = ''
	export { className as class }
	export let initialData: $$Props['initialData'] = undefined
	export let giftEventId: $$Props['giftEventId']

	let query: ComponentProps<GiftEventsCard>['query']

	const userAddress = $userStore.isLoggedIn
		? createQuery({
				queryKey: UsersQueries.getAddress.createKey($userStore.current.id),
				queryFn: async (...data) => UsersQueries.getAddress.queryFn(...data)
		  })
		: undefined

	const userSocials = $userStore.isLoggedIn
		? createQuery({
				queryKey: UsersQueries.getSocials.createKey($userStore.current.id),
				queryFn: async (...data) => UsersQueries.getSocials.queryFn(...data)
		  })
		: undefined

	const isUserRegisteredQuery = $userStore.isLoggedIn
		? createQuery({
				queryKey: GiftEventsQueries.isUserRegistered.createKey(giftEventId, $userStore.current.id),
				queryFn: async (...data) => GiftEventsQueries.isUserRegistered.queryFn(...data)
		  })
		: undefined

	const handler = {
		registrationSuccess() {
			$query?.refetch()
			$isUserRegisteredQuery?.refetch()
		},
		exitSuccess() {
			$query?.refetch()
			$isUserRegisteredQuery?.refetch()
		}
	}
</script>

<GiftEventsCard {initialData} {giftEventId} bind:query class={`GiftEventsCard ${className}`}>
	<svelte:fragment slot="buttons">
		{#if $userStore.isLoggedIn}
			{#if $isUserRegisteredQuery?.isPending || $userAddress?.isPending || $userSocials?.isPending}
				<Button variant="unelevated" disabled>Запрашиваем...</Button>
			{:else if !$userSocials?.data?.telegramUsername}
				<Button variant="unelevated" href="/account/settings/socials">Укажите ваш @Telegram</Button>
			{:else if !$userAddress?.data?.country}
				<Button variant="unelevated" href="/account/settings/address">Укажите страну</Button>
			{:else if $isUserRegisteredQuery?.data?.result}
				<Exit {giftEventId} on:success={handler.exitSuccess} />
			{:else}
				<Registration {giftEventId} on:success={handler.registrationSuccess} />
			{/if}
		{:else}
			<Button variant="unelevated" href="/users/login">Войдите, чтобы зарегистрироваться</Button>
		{/if}
	</svelte:fragment>
</GiftEventsCard>
