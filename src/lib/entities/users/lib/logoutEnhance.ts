import type { SubmitFunction } from "@sveltejs/kit"
import { pb } from "$shared/api/pocketbase"
import { applyAction } from "$app/forms"

export const usersLogoutEnhance:SubmitFunction = () => {
    return async ({result}) => {
        pb.authStore.clear()
        await applyAction(result)
    }
}