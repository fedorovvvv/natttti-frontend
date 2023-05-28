<script lang='ts'>
	import type { IStat } from "$shared/api/stats";
	import type { ApiReturn } from "$shared/lib/Api";
	import { Box } from "$shared/ui/Box";
	import { ChartGrid } from "$shared/ui/Chart/ChartGrid";
	import { TimeScale } from "chart.js";
	import dayjs from "dayjs";
	import type { ComponentProps } from "svelte";

	interface $$Props {
		class?:string
		data:ApiReturn<IStat[]>
	}
	
	let className = ''
	export { className as class }
	export let data:$$Props['data']

	const datasets = (_data:Awaited<typeof data>):ComponentProps<ChartGrid>['data']['datasets'] => {
		if (_data._error) return []
		const parsedData = _data.map(stat => {
			return {
				x: +dayjs(stat.date).toDate(),
				messagesCount: stat.messagesCount,
				newMembersCount: stat.newMembersCount,
			}
		}).sort((a, b) => b.x - a.x)

		return [
			{
				label: 'Вступило',
				data: parsedData.map(s => {
					return {
						x: s.x,
						y: s.newMembersCount
					}
				}),
				backgroundColor: 'blue',
				borderColor: 'blue',
			},
			{
				label: 'Сообщений',
				data: parsedData.map(s => {
					return {
						x: s.x,
						y: s.messagesCount
					}
				}),
				backgroundColor: 'green',
				borderColor: 'green',
			},
		]
	}

	const chartProps:Omit<ComponentProps<ChartGrid>, 'data'> = {
			register: [TimeScale],
			options: {
				scales: {
					y: {
						title: {
							text: 'кол-во',
							display: true,
						}
					},
					x: {
						type: 'time',
					}
				}
			}
		}
	
</script>

<Box class={`Stats ${className}`}>
	{#await data}
		<b class='Stats__loader'>Поиск архивов...</b>
	{:then res} 
		<div class="Stats__scroll">
			<ChartGrid
				data={{
					datasets: datasets(res)
				}}
				{...chartProps}
			/>
		</div>
	{/await}
</Box>

<style lang='sass'>
	.Stats
		$root: &
		@at-root :global &
			overflow: auto
			height: 500px
			display: flex
			position: relative
		&__scroll
			min-width: 700px
			width: 100%
			height: 100%
		&__loader
			position: absolute
			display: block
			font-size: 50px
			color: var(--gray50)
			top: 50%
			left: 50%
			width: 100%
			text-align: center
			transform: translate(-50%, -50%)
</style>