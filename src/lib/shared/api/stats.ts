import { CONFIG } from '$shared/config'
import { Requests } from '$shared/lib/Api/Requests'
import { encodeQueryData } from '$shared/lib/Api/utils'

export interface IStat {
	id: number
	date: string
	newMembersCount: number
	messagesCount: number
}

export type StatCurrent = Omit<IStat, 'id'>

export class StatsRequests extends Requests {
	constructor(...params: ConstructorParameters<typeof Requests>) {
		super(params[0] || CONFIG.API.STATS_TOKEN, params[1])
	}
	async get(options: { from: Date | string; to: Date | string }) {
		return await this.api<IStat[]>({
			method: 'GET',
			path: `stats?${encodeQueryData(options)}`
		})
	}

	async current() {
		return await this.api<StatCurrent>({
			method: 'GET',
			path: `stats/current`
		})
	}
}
