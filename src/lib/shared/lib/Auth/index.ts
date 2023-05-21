import { session } from "$shared/stores/session";
import { CookiesHelper } from "../CookiesHelper";
import { browser } from "$app/environment";
import { goto } from "$app/navigation";

export class Auth {
    static setToken(data:Required<Pick<App.Locals, 'accessToken'>>) {
        if (browser) {
            CookiesHelper.set('accessToken', data.accessToken)
            session.update(s => {
                return {
                    ...s,
                    accessToken: data.accessToken
                }
            })
        }
    }
    static login(data:Parameters<typeof Auth['setToken']>[0]) {
        this.setToken(data)
    }
    static logout() {
        CookiesHelper.remove('accessToken')
        session.update(({accessToken, ...s}) => s)
        goto('/')
    }
}