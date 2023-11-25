import type { Chart, ChartData } from 'chart.js'
import type { ChartColors as Colors } from '$shared/types/chart'
import { ChartColors } from '../../ChartColors'

export const replaceDataColors = <T extends ChartData>(data: T, chart: Chart, theme?: Parameters<(typeof ChartColors)['getGradient']>[0]['theme']): T => {
	data.datasets = data.datasets.map((d) => {
		d.backgroundColor &&= ChartColors.getGradient({
			ctx: chart.ctx,
			color: d.backgroundColor as Colors,
			theme,
			gradientPosition: [0, 0, 0, chart.canvas.height]
		})
		d.borderColor &&= `rgb(${ChartColors.getColor(d.borderColor as Colors)})`
		return d
	})
	return data
}
