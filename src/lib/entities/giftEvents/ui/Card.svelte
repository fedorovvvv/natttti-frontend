<script lang="ts">
	import Button from '@smui/button/src/Button.svelte'
	import dayjs from 'dayjs'
	import { Box } from '$shared/ui/Box'
	import type { GiftEvent } from '../types'

	interface $$Props {
		class?: string
		data: GiftEvent
	}

	let className = ''
	export { className as class }

	export let data: $$Props['data']
</script>

<Box class={`GiftEventsCard ${className}`}>
	<h2>{data.name}</h2>
	{#if data.description}
		<div class="GiftEventsCard__description">
			{@html data.description}
		</div>
	{/if}
	<ul class="GiftEventsCard__info">
		<li>
			<b>Участников:</b>
			{data.members.length}
		</li>
		{#if data.startAt}
			<li>
				<b>Начало:</b>
				{dayjs(data.startAt).format('DD MMMM YYYY')}
			</li>
		{/if}
		{#if data.endAt}
			<li>
				<b>Конец:</b>
				{dayjs(data.endAt).format('DD MMMM YYYY')}
			</li>
		{/if}
	</ul>
	<div class="GiftEventsCard__footer">
		<div class="GiftEventsCard__buttons">
			<Button variant="unelevated">Регистрация</Button>
		</div>
	</div>
</Box>

<style lang="sass">
    .GiftEventsCard
        @at-root :global &
            text-align: left
        &__description
            margin-top: 10px
        &__info
            margin-top: 20px
            text-align: left
            li
                &:not(:last-child)
                    margin-bottom: 8px
        &__footer
            margin-top: 40px
            padding-top: 20px
            border-top: 1px solid var(--clue-color-gray-100)
        &__buttons
</style>
