import { Requests } from "$shared/lib/Api/Requests";

export class AuthRequests extends Requests {
    constructor(...params:ConstructorParameters<typeof Requests>) {
        super(...params)
    }
    async login(data:{
        accessToken:string
    }) {
        return await this.api({
            method: 'POST',
            path: 'auth/login',
            body: {
                accessToken: data.accessToken
            }
        })
    }
}