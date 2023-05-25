import { Requests } from "$shared/lib/Api/Requests";
import { encodeQueryData } from "$shared/lib/Api/utils";

interface IStat {
    id: number
    date: string,
    newMembersCount: number,
    messagesCount: number,
}

export class StatsRequests extends Requests {
    constructor(...params:ConstructorParameters<typeof Requests>) {
        super(...params)
    }
    async get(options:{
        from: Date | string,
        to: Date | string
    }) {
        return await this.api<IStat[]>({
            method: 'GET',
            path: `stats?${encodeQueryData(options)}`,
        })
    }
}