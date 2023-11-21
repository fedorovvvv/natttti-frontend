import { redirect } from "@sveltejs/kit"
import { UsersApi } from "$entities/users/index.js"

export const load = async ({locals,parent}) => {
    const {user} = await parent()

    if (!user?.id) throw redirect(303, '/')

    return {
        socials: await UsersApi.getSocials(user.id, locals.pb)
    }
}