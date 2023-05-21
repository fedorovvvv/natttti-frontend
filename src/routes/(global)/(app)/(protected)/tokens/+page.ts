import { error, type Load } from "@sveltejs/kit";
import { TokenRequests } from "$shared/api/token";
import type { PageParentData } from "./$types";

export const load:Load = async({parent, fetch}) => {
    const parentData = await parent() as PageParentData
    const session = parentData.session

    const tokenRequests = new TokenRequests(session.accessToken, fetch)

    const [allTokens] = await Promise.all([tokenRequests.get()])

    if (allTokens._error) {
        throw error(allTokens.status)
    }

    return {
        allTokens
    }
}