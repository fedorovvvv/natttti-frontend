<script lang="ts">
	import Button from '@smui/button'
	import type { ComponentProps } from 'svelte'
	import { GiftEventsCard } from '$entities/giftEvents'
	import { userStore } from '$entities/users'
	import { pb } from '$shared/api/pocketbase'
	import Exit from './Exit/Exit.svelte'
	import Registration from './Registration/Registration.svelte'

	interface $$Props extends ComponentProps<GiftEventsCard> {
		class?: string
		isRegistered: boolean
	}

	let className = ''
	export { className as class }
	export let data: $$Props['data']
	export let isRegistered: $$Props['isRegistered']
</script>

<GiftEventsCard {data} class={`GiftEventsCard ${className}`}>
	<svelte:fragment slot="buttons">
		{#if $userStore.isLoggedIn}
			{#if !isRegistered}
				<Registration giftEventId={data.id} variant="unelevated" on:success/>
			{:else}
				<Exit giftEventId={data.id}/>
			{/if}
		{:else}
			<Button variant="unelevated" href="/users/login">Войдите, чтобы зарегистрироваться</Button>
		{/if}
	</svelte:fragment>
</GiftEventsCard>
