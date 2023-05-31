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
		syncData?:IStat[]
	}
	
	let className = ''
	export { className as class }
	export let data:$$Props['data']
	export let syncData:$$Props['syncData'] = undefined

	let loaded = false


	const getCharts = (_data:Awaited<typeof data>, _syncData:typeof syncData):{
		id:string
		title:string
		avg:number
		datasets:ComponentProps<ChartGrid>['data']['datasets']
	}[] => {
		if (_data._error) return []
		const parsedData = [..._data, ...(_syncData || [])].map(stat => {
			return {
				x: +dayjs(stat.date).toDate(),
				messagesCount: stat.messagesCount,
				newMembersCount: stat.newMembersCount,
			}
		}).sort((a, b) => b.x - a.x)
		return [
			{
				id: 'messages',
				title: '✉️ Сообщения',
				avg: +(parsedData.reduce((val, cur) => val + cur.messagesCount, 0) / parsedData.length).toFixed(0),
				datasets: [
					{
						label: 'Написано',
						data: parsedData.map(s => {
							return {
								x: s.x,
								y: s.messagesCount
							}
						}),
						backgroundColor: 'green',
						borderColor: 'green',
					}
				]
			},
			{
				id: 'members',
				title: '🐣 Новые члены профсоюза',
				avg: +(parsedData.reduce((val, cur) => val + cur.newMembersCount, 0) / parsedData.length).toFixed(0),
				datasets: [
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
					}
				]
			},
		]
	}

	$: chartProps = {
		register: [TimeScale],
		options: {
			animation: {
				duration: loaded ? 0 : 1000,
				loop: dayjs().format('HH%mm') === '13%00',
				onComplete() {
					loaded = true
				}
			},
			scales: {
				x: {
					type: 'time',
				}
			}
		}
	} satisfies Omit<ComponentProps<ChartGrid>, 'data'>
	
</script>
<div class={`Stats ${className}`}>
	{#await data}
		<b class='Stats__loader'>Поиск архивов...</b>
	{:then res}
		<div class="Stats__chart-list">
			{#each getCharts(res, syncData) as {id, title, datasets, avg} (id)}
				<Box class='Stats__chart-box'>
					<h3 class='Stats__chart-title'>{title} <small>среднее: <b>{avg}</b></small></h3>
					<div class="Stats__chart-scroll-wrapper">
						<div class="Stats__chart-scroll">
							<ChartGrid
								data={{
									datasets
								}}
								{...chartProps}
								class='Stats__chart'
							/>
						</div>
					</div>
				</Box>
			{/each}
		</div>
	{/await}
</div>

<style lang='sass'>
	.Stats
		$root: &
		&__chart
			@at-root :global &
				height: 250px
			&-title
				text-align: center
				margin-bottom: 20px
				small
					display: block
					font-size: 12px
					color: var(--gray400)
			&-box
				@at-root :global &
					&:not(:last-child)
						margin-bottom: 20px
			&-list
				// display: grid
				// grid-template-columns: repeat(auto-fit, minmax(400px, 1fr))
				// gap: 20px
			&-scroll
				min-width: 700px
				width: 100%
				height: 100%
				&-wrapper
					overflow: auto
		&__loader
			display: block
			font-size: 50px
			color: var(--gray50)
			text-align: center
			margin-top: 40px
			@media (max-width: $sm)
				font-size: 30px
</style>