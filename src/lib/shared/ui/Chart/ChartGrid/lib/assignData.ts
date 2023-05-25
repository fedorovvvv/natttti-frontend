import type { IChartGridData } from './../types'
import type { AssignDataFunction } from "$shared/types/chart";
import { ChartHelper } from '$shared/lib/Chart/ChartHelper';

export const assignData:AssignDataFunction<IChartGridData> = (data, chartInstance) => {
    if (chartInstance) {
        data = ChartHelper.replaceDataColors(data, chartInstance, 'light')
    }
    data.datasets = data.datasets.map(d => {
        d.pointBackgroundColor = '#fff'
        return d
    })
    return data
}