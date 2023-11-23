<script lang="ts">
	import type { IStat } from '$shared/api/stats'
	import type { ApiReturn } from '$shared/lib/Api'
	import { Box } from '$shared/ui/Box'
	import { ChartGrid } from '$shared/ui/Chart/ChartGrid'
	import { LoadText } from '$shared/ui/Load'
	import { TimeScale } from 'chart.js'
	import dayjs from 'dayjs'
	import { onMount, type ComponentProps } from 'svelte'

	interface $$Props {
		class?: string
		data: ApiReturn<IStat[]>
		syncData?: IStat[]
	}

	let className = ''
	export { className as class }
	export let data: $$Props['data']
	export let syncData: $$Props['syncData'] = undefined

	let loaded = false

	const getCharts = (
		_data: Awaited<typeof data>,
		_syncData: typeof syncData
	): {
		id: string
		title: string
		avg: number
		datasets: ComponentProps<ChartGrid>['data']['datasets']
	}[] => {
		if (_data._error) return []
		const parsedData = [..._data, ...(_syncData || [])]
			.map((stat) => {
				return {
					x: +dayjs(stat.date).toDate(),
					messagesCount: stat.messagesCount,
					newMembersCount: stat.newMembersCount
				}
			})
			.sort((a, b) => b.x - a.x)

		return [
			{
				id: 'messages',
				title: '✉️ Телеграммы',
				avg:
					+(
						parsedData.reduce((val, cur) => val + cur.messagesCount, 0) / parsedData.length
					).toFixed(0) || 0,
				datasets: [
					{
						label: 'Написано',
						data: parsedData.map((s) => {
							return {
								x: s.x,
								y: s.messagesCount
							}
						}),
						backgroundColor: 'green',
						borderColor: 'green'
					}
				]
			},
			{
				id: 'members',
				title: '🐣 Новые люди профсоюза',
				avg:
					+(
						parsedData.reduce((val, cur) => val + cur.newMembersCount, 0) / parsedData.length
					).toFixed(0) || 0,
				datasets: [
					{
						label: 'Вступило',
						data: parsedData.map((s) => {
							return {
								x: s.x,
								y: s.newMembersCount
							}
						}),
						backgroundColor: 'blue',
						borderColor: 'blue'
					}
				]
			}
		]
	}

	let awaitedData: Awaited<typeof data> | undefined

	onMount(() => {
		data.then((res) => {
			awaitedData = res
		})
	})

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
					type: 'time'
				}
			}
		}
	} satisfies Omit<ComponentProps<ChartGrid>, 'data'>
</script>

<div class={`Stats ${className}`}>
	<div class="Stats__chart-list">
		{#each getCharts(awaitedData || [], syncData) as { id, title, datasets, avg } (id)}
			<Box class="Stats__chart-box">
				<h3 class="Stats__chart-title">{title} <small>среднее: <b>{avg}</b></small></h3>
				<div class="Stats__chart-container">
					{#if awaitedData}
						<div class="Stats__chart-scroll">
							<ChartGrid
								data={{
									datasets
								}}
								{...chartProps}
								class="Stats__chart"
							/>
						</div>
					{:else}
						<LoadText class="Stats__loader">Поиск архивов...</LoadText>
					{/if}
				</div>
			</Box>
		{/each}
	</div>
</div>

<style lang="sass">
	.Stats
		$root: &
		&__chart
			&-title
				text-align: center
				margin-bottom: 20px
				flex: none
				small
					display: block
					font-size: 12px
					color: var(--clue-color-gray-400)
			&-box
				@at-root :global &
					&:not(:last-child)
						margin-bottom: 20px
			&-list
				// display: grid
				// grid-template-columns: repeat(auto-fit, minmax(400px, 1fr))
				// gap: 20px
			&-container
				height: 230px
				overflow: auto
				display: flex
				align-items: center
			&-scroll
				min-width: 700px
				width: 100%
				height: 100%
		&__loader
			@at-root :global &
				display: block
				text-align: center
				margin-left: auto
				margin-right: auto
</style>
