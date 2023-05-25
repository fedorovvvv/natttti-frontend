<script lang='ts'>
	import { Line } from 'svelte-chartjs'
	import { assignData } from '../../lib/assignData'
	import {
		Chart as ChartJS,
		LineElement,
		LinearScale,
		PointElement,
		CategoryScale,
		type ChartOptions,
		Filler,
	} from 'chart.js';
	import type { ChartLineInstance, IChartLineData } from '../../types'
	import _ from 'lodash'
	import { onMount, tick } from 'svelte'

	interface $$Props {
		data:IChartLineData
	}

	let className = ''
	export { className as class }

	export let data:$$Props['data']

	let chart:ChartLineInstance | undefined = undefined

	ChartJS.register(
		Filler,
		LineElement,
		LinearScale,
		PointElement,
		CategoryScale
	)
	
	const options:ChartOptions<'line'> = {
		maintainAspectRatio: false,
		elements: {
			line: {
				borderWidth: 3,
				fill: true,
				tension: 0.45
			},
			point: {
				radius: 0,
				hitRadius: 0,
				drawActiveElementsOnTop: false,
				pointStyle: false,
			}
        },
        scales: {
			x: {
				display: false
			},
			y: {
				display: false
			}
		},
	}
	
	const controller = {
		getData: assignData,
	}

	let assignedData = controller.getData(_.cloneDeep(data), chart)
	
	onMount(() => {
		tick().then(() => {
			assignedData = controller.getData(_.cloneDeep(data), chart)
		})
	})

	$: assignedData = controller.getData(_.cloneDeep(data), chart)
</script>

<Line bind:chart data={assignedData} {options} width='100%' height='100%' class={`ChartLine ${className}`}/>