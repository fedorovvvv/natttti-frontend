import type { DeepPartial } from "$lib/Types/global"
import type { Scale, ScaleOptionsByType } from "chart.js"

type ScaleOptions = ScaleOptionsByType<'time'>

export class ScaleGenerator {
    options:DeepPartial<ScaleOptions>
    flags:{
        time?:boolean
    } = {}

    constructor(options?:ScaleOptions) {
        this.options = {
            border: {
                display: false
            },
            ...(options || {})
        }
    }

    grid({tickLength = 20, ...options}:Partial<ScaleOptions['grid']> = {}) {
        const color = 'rgba(226,226,226,0.31)'
        const tickBorderDashOffset = tickLength * 2
        this.options.grid = {
            drawTicks: true,
            tickLength,
            tickBorderDashOffset,
            tickBorderDash: [tickBorderDashOffset],
            color,
            tickColor: color,
            ...options
        }
        return this
    }
    time(options:Partial<ScaleOptions['time']> = {}) {
        this.options.time = {
            unit: 'day',
            displayFormats: {
                day: 'DD'
            },
            tooltipFormat: 'DD',
            ...options
        }
        return this
    }
    ticks(options:Partial<ScaleOptions['ticks']> = {}) {
        const timeOptions:typeof this.options.ticks = {
            align: 'start',
            callback(value:number) {
                return `${new Date(value).getDate()}`
            }
        }
        this.options.ticks = {
            color: '#9397A9',
            padding: 0,
            // eslint-disable-next-line no-extra-boolean-cast
            ...(!!this.options.time ? timeOptions : {}),
            ...options
        }
        return this
    }
    title(options:Partial<ScaleOptions['title']> = {}) {
        this.options.title = {
            color: '#9397A9',
            font: {
                size: 12
            },
            padding: 4,
            ...options
        }
        return this
    }
    toOptions() {
        return this.options
    }
}