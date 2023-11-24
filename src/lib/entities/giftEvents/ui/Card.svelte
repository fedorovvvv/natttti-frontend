<script lang="ts">
	import Button from '@smui/button/src/Button.svelte'
	import dayjs from 'dayjs'
	import type { EventsRecord, GiftEventsResponse } from '$shared/api/pocketbase'
	import { Box } from '$shared/ui/Box'

	interface $$Props {
		class?: string
		data: GiftEventsResponse<{
			event: EventsRecord
		}>
	}

	let className = ''
	export { className as class }

	export let data: $$Props['data']

	$: event = data.expand?.event
</script>

<Box class={`GiftEventsCard ${className}`}>
	{#if event?.name}
		<h2>{event.name}</h2>
	{/if}
	{#if event?.description}
		<div class="GiftEventsCard__description">
			{@html event.description}
		</div>
	{/if}
	<ul class="GiftEventsCard__info">
		<li>
			<b>Участников:</b>
			{data.members.length}
		</li>
		{#if event?.startAt}
			<li>
				<b>Начало:</b>
				{dayjs(event.startAt).format('DD MMMM YYYY')}
			</li>
		{/if}
		{#if event?.endAt}
			<li>
				<b>Конец:</b>
				{dayjs(event.endAt).format('DD MMMM YYYY')}
			</li>
		{/if}
	</ul>
	<div class="GiftEventsCard__footer">
		{#if $$slots.buttons}
			<div class="GiftEventsCard__buttons">
				<slot name="buttons" />
			</div>
		{/if}
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
