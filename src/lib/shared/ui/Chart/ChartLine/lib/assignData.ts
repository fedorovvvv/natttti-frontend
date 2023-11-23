import { ChartHelper } from '$shared/lib/Chart/ChartHelper'
import type { AssignDataFunction } from '$shared/types/chart'
import type { IChartLineData } from './../types'

export const assignData: AssignDataFunction<IChartLineData> = (data, chartInstance) => {
	if (chartInstance) {
		data = ChartHelper.replaceDataColors(data, chartInstance)
	}
	return data
}
