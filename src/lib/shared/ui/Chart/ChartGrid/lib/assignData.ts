import { ChartHelper } from '$shared/lib/Chart/ChartHelper'
import type { AssignDataFunction } from '$shared/types/chart'
import type { IChartGridData } from './../types'

export const assignData: AssignDataFunction<IChartGridData> = (data, chartInstance) => {
	if (chartInstance) {
		data = ChartHelper.replaceDataColors(data, chartInstance, 'light')
	}
	data.datasets = data.datasets.map((d) => {
		d.pointBackgroundColor = '#fff'
		return d
	})
	return data
}
