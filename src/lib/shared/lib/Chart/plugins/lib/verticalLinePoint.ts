import type { Plugin, TooltipModel } from 'chart.js'
import { CanvasHelper } from '$shared/lib/CanvasHelper'

const drawLine = (
	tooltip: TooltipModel<'line'>,
	options: Parameters<(typeof CanvasHelper)['roundedRectPath']>[0]
) => {
	const ctx = tooltip.chart.ctx

	const colorRgb = (tooltip.labelColors[0].borderColor as string).replace(
		new RegExp('[rgb\\(\\)]', 'g'),
		''
	)
	const gradient = CanvasHelper.createGradient({
		ctx,
		colors: [
			{
				rgb: colorRgb,
				alpha: 0.5
			},
			{
				rgb: colorRgb,
				alpha: 0
			}
		],
		gradientPosition: [options.x, options.y, options.x + options.width, options.y + options.height]
	})

	ctx.fillStyle = gradient
	ctx.fill(new Path2D(CanvasHelper.roundedRectPath(options)))
}

export const verticalLinePoint: Plugin<'line'> = {
	id: 'verticalLinePoint',
	beforeTooltipDraw(chart, args) {
		const { tooltip } = args
		const { ctx } = chart
		const yAxis = chart.scales.y

		const point = chart.options.elements?.point
		const pointRadius = (point?.hoverRadius || point?.radius || 0) as number
		const width = 28
		const x = tooltip.caretX - width / 2
		const y = (() => {
			if (
				['index', 'y'].includes(chart.options.interaction?.mode || '') &&
				tooltip.dataPoints.length > 1
			)
				return 0
			return tooltip.caretY - (pointRadius + 4)
		})()
		const height = yAxis.bottom - y

		ctx.save()

		drawLine(tooltip, {
			x,
			y,
			width,
			height,
			radius: 10
		})

		ctx.restore()
	}
}
