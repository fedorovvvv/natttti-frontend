<script lang='ts'>
	import { CategoryScale, Chart, Filler, LinearScale, LineElement, PointElement, Tooltip, type ChartOptions } from "chart.js"
	import { merge } from "lodash"
	import { Line } from "svelte-chartjs"
	import { assignData } from "../../lib/assignData"
	import type { ChartGridInstance, IChartGridData } from "../../types"
	import 'chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm'
	import { ScaleGenerator } from "../../lib/ScaleGenerator"
	import dayjs from "dayjs"
	import { verticalLinePointPlugin } from "$shared/lib/Chart/plugins"
	import { cloneDeep } from "lodash"
	import { onMount, tick } from "svelte"

	interface $$Props {
		class?:string
		data:IChartGridData
		options?:ChartOptions<'line'>
		register?:Parameters<typeof Chart['register']>[0][]
	}
	
	let className = ''
	export { className as class }

	export let data:$$Props['data']
	export let options:$$Props['options'] = undefined
	export let register:$$Props['register'] = []

	let chart:ChartGridInstance | undefined = undefined
	
	Chart.register(
		Filler,
		Tooltip,
		verticalLinePointPlugin,
		LineElement,
		LinearScale,
		PointElement,
		CategoryScale,
		...(register || [])
	)

	let assignedOptions:ChartOptions<'line'> = {}
	const defaultOptions:typeof assignedOptions = {
		maintainAspectRatio: false,
		responsive: true,
		font: {
			size: 14,
			family: 'Montserrat',
		},
		elements: {
			line: {
				borderWidth: 2,
				fill: true,
				tension: 0.45
			},
			point: {
				borderWidth: 2,
				radius: 4,
				hitRadius: 6, 
				hoverRadius: 6,
				hoverBorderWidth: 2,
				hoverBackgroundColor: '#fff',
			},
        },
		interaction: {
			intersect: false,
			mode: 'index'
		},
		plugins: {
			tooltip: {
				backgroundColor: '#fff',
				borderColor: '#E8E9ED',
				bodyColor: '#1B1C22',
				titleColor: '#1B1C22',
				borderWidth: 1,
				usePointStyle: true,
				callbacks: {
					title(points) {
						return dayjs(points[0].parsed?.x as number).format('MMM DD')
					},
					labelPointStyle() {
						return {
							pointStyle: 'rectRounded',
							rotation: 0
						}	
					},
				}
			}
		},
		scales: {
			//@ts-ignore
			y: new ScaleGenerator()
					.grid({
						tickLength: 26
					})
					.ticks()
					.title()
					.toOptions(),
			//@ts-ignore
			x: new ScaleGenerator()
					.grid({
						tickLength: 12
					})
					.time()
					.ticks()
					.title()
					.toOptions(),
			//@ts-ignore
			xMonths: (options?.scales.x.type === 'time' ? new ScaleGenerator({type: 'time'})
					.grid({
						tickLength: 2
					})
					.time()
					.ticks({
						align: 'start',
						callback(value, index) {
							if (new Date(+value).getDate() === 1 || index === 0) {
								return dayjs(+value).format('MMM YYYY')
							}
							return
						}
					})
					.title()
					.toOptions() : undefined)
		}
	}

	//@ts-ignore
	$: assignedOptions = merge(defaultOptions, options)

	const controller = {
		getData: assignData
	}


	let assignedData = controller.getData(cloneDeep(data), chart)
	
	onMount(() => {
		tick().then(() => {
			assignedData = controller.getData(cloneDeep(data), chart)
		})
	})

	$: assignedData = controller.getData(cloneDeep(data), chart)

</script>

<Line bind:chart data={assignedData} options={assignedOptions} width='100%' height='100%' class={`ChartGrid ${className}`}>
</Line>