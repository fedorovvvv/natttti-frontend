import type { Chart, ChartData, Point } from "chart.js";

type Data = (number | Point)[]

export type ChartLineInstance = Chart<'line', Data, unknown>

export type IChartLineData = ChartData<'line', Data, unknown>