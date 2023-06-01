import type { Endpoints, RequestParameters } from "@octokit/types";
import { Requests } from "$shared/lib/Api/Requests";
import { encodeQueryData } from "$shared/lib/Api/utils";

type IRoute = {
    // get: Endpoints extends `GET ${infer T}` ? T : false
}
export class GitRequests extends Requests {
    constructor(fetch?:ConstructorParameters<typeof Requests>[1]) {
        super(undefined, fetch, {
            base: '/api'
        })
    }
    async get<T extends keyof Endpoints>(route:T, options:Endpoints[T]['parameters']) {
        return await this.api<Endpoints[T]['response']['data']>({
            method: 'GET',
            path: `git?route=${route}&${encodeQueryData(options)}`,
        })
    }
    async getContributors() { //Когда-нибудь надо починить
        const all = await Promise.all([
            this.get('GET /repos/{owner}/{repo}/contributors', {
                owner: 'eveloth',
                repo: 'natti-chat-bot',
            }),
            this.get('GET /repos/{owner}/{repo}/contributors', {
                owner: 'fedorovvvv',
                repo: 'natti-site',
            })
        ]) as Awaited<ReturnType<typeof this['get']>>[]

        //@ts-ignore
        return all.flat().reduce((val, cur) => {
            if (cur._error !== true) {
                //@ts-ignore
                if (val.findIndex(({id}) => id === cur.id) === -1) {
                    //@ts-ignore
                    return val.concat([cur])
                }
            }
            return val
        }, []) as Endpoints['GET /repos/{owner}/{repo}/contributors']['response']['data']
    }
}