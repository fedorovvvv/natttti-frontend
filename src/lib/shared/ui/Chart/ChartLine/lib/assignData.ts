import type { IChartLineData } from './../types'
import type { AssignDataFunction } from "$shared/types/chart";
import { ChartHelper } from '$shared/lib/Chart/ChartHelper';

export const assignData:AssignDataFunction<IChartLineData> = (data, chartInstance) => {
    if (chartInstance) {
        data = ChartHelper.replaceDataColors(data, chartInstance)
    }
    return data
}