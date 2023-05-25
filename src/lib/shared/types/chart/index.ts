import type { Chart, ChartData } from "chart.js";

export type ChartColors = 'green' | 'blue'

export type AssignDataFunction<T extends ChartData> = (data:T, chartInstance?:Chart) => T