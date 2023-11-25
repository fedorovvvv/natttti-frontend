<script lang="ts">
	import Button from '@smui/button'
	import type { ComponentProps } from 'svelte'
	import { GiftEventsCard } from '$entities/giftEvents'
	import { userStore } from '$entities/users'
	import Registration from './Registration/Registration.svelte'

	interface $$Props extends ComponentProps<GiftEventsCard> {
		class?: string
		isAllow: boolean
	}

	let className = ''
	export { className as class }
	export let data: $$Props['data']
	export let isAllow: $$Props['isAllow']
</script>

<GiftEventsCard {data} class={`GiftEventsCard ${className}`}>
	<svelte:fragment slot="buttons">
		{#if $userStore.isLoggedIn}
			{#if isAllow}
				<Registration giftEventId={data.id} variant="unelevated" on:success>Регистрация</Registration>
			{:else}
				<Button variant="unelevated" disabled>Вы записаны</Button>
			{/if}
		{:else}
			<Button variant="unelevated" href="/users/login">Войдите, чтобы зарегистрироваться</Button>
		{/if}
	</svelte:fragment>
</GiftEventsCard>
