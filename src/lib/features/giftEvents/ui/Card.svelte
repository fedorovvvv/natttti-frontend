<script lang="ts">
	import Button from '@smui/button'
	import { createQuery } from '@tanstack/svelte-query'
	import type { ComponentProps } from 'svelte'
	import { GiftEventsCard, GiftEventsQueries } from '$entities/giftEvents'
	import { userStore } from '$entities/users'
	import Exit from './Exit/Exit.svelte'
	import Registration from './Registration/Registration.svelte'

	interface $$Props extends ComponentProps<GiftEventsCard> {
		class?: string
	}

	let className = ''
	export { className as class }
	export let initialData: $$Props['initialData'] = undefined
	export let giftEventId: $$Props['giftEventId']

	let query:ComponentProps<GiftEventsCard>['query']

	const isUserRegisteredQuery = $userStore.isLoggedIn ? createQuery({
		queryKey: GiftEventsQueries.isUserRegistered.createKey(giftEventId, $userStore.current.id),
		queryFn: async (...data) => GiftEventsQueries.isUserRegistered.queryFn(...data) 
	}) : undefined

	const handler = {
		registrationSuccess() {
			$query?.refetch()
		},
		exitSuccess() {
			$query?.refetch()
		}
	}


</script>

<GiftEventsCard {initialData} {giftEventId} bind:query class={`GiftEventsCard ${className}`}>
	<svelte:fragment slot="buttons">
		{#if $userStore.isLoggedIn}
			{#if $isUserRegisteredQuery?.isPending}
				<Button variant="unelevated" disabled>Запрашиваем...</Button>
			{:else}
				{#if $isUserRegisteredQuery?.data?.result}
					<Registration {giftEventId} variant="unelevated" on:success={handler.registrationSuccess} />
				{:else}
					<Exit {giftEventId} on:success={handler.exitSuccess} />
				{/if}
			{/if}
		{:else}
			<Button variant="unelevated" href="/users/login">Войдите, чтобы зарегистрироваться</Button>
		{/if}
	</svelte:fragment>
</GiftEventsCard>
