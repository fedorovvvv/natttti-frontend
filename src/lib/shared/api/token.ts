import { Requests } from "$shared/lib/Api/Requests";
import type { IToken } from "$shared/types/token";

export class TokenRequests extends Requests {
    constructor(...params:ConstructorParameters<typeof Requests>) {
        super(...params)
    }
    async get() {
        return await this.api<IToken[]>({
            method: 'GET',
            path: 'token'
        })
    }
    async create(data:Pick<IToken, 'expiresAt' | 'grantedTo' | 'accessType'>) {
        return await this.api<IToken>({
            method: 'POST',
            path: 'token',
            body: data
        })
    }
    async delete(id:IToken['id']) {
        return await this.createApi({
            method: 'DELETE',
            path: `token/${id}`
        }).call({
            responseParser: 'text'
        })
    }
    async update({id, ...data}:Pick<IToken, 'expiresAt' | 'grantedTo' | 'accessType' | 'id'>) {
        return await this.api<IToken>({
            method: "PUT",
            path: `token/${id}`,
            body: data
        })
    }
}