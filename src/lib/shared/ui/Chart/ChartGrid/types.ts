import type { Chart, ChartData, Point } from "chart.js";

type Data = (number | Point)[]

export type ChartGridInstance = Chart<'line', Data, unknown>

export type IChartGridData = ChartData<'line', Data, unknown>