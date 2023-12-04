<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query'
	import dayjs from 'dayjs'
	import type { EventsRecord, GiftEventsResponse } from '$shared/api/pocketbase'
	import { Box } from '$shared/ui/Box'
	import {RichContent} from '$shared/ui/RichContent'
	import { GiftEventsQueries } from '../api'

	interface $$Props {
		class?: string
		giftEventId: string
		initialData?: GiftEventsResponse<{
			event: EventsRecord
		}>
	}

	let className = ''
	export { className as class }

	export let giftEventId: $$Props['giftEventId']
	export let initialData: $$Props['initialData'] = undefined

	export const query = createQuery({
		queryKey: GiftEventsQueries.getOne.createKey(giftEventId),
		refetchInterval: 1000 * 60 * 2, //2 min
		queryFn: async (...data) => await GiftEventsQueries.getOne.queryFn(...data),
		initialData: initialData as Exclude<typeof initialData, undefined>
	})

	$: event = $query.data?.expand?.event
</script>

<Box class={`GiftEventsCard ${className}`}>
	{#if $query.status === 'success'}
		{#if event?.name}
			<h2>{event.name}</h2>
		{/if}
		{#if event?.description}
			<RichContent class="GiftEventsCard__description">
				{@html event.description}
			</RichContent>
		{/if}
		<ul class="GiftEventsCard__info">
			<li>
				<b>Участников:</b>
				{$query.data.members.length}
			</li>
			{#if $query.data.minPrice}
				<li>
					<b>Минимальная цена:</b> {$query.data.minPrice}р
				</li>
			{/if}
			{#if $query.data.maxPrice}
				<li>
					<b>Максимальная цена:</b> {$query.data.maxPrice}р
				</li>
			{/if}
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
	{/if}
</Box>

<style lang="sass">
	.GiftEventsCard
		@at-root :global &
			text-align: left
			transition: .3s ease-in-out
			transition-property: filter
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
</style>
