import type { RequestParameters } from "@octokit/types";
import type { RequestHandler } from "@sveltejs/kit";
import { Octokit } from "octokit";
import { PRIVATE_GITHUB_TOKEN } from "$env/static/private";

const octokit = new Octokit({
    auth: PRIVATE_GITHUB_TOKEN
})

export const GET:RequestHandler = async ({request, setHeaders}) => {
    if (!PRIVATE_GITHUB_TOKEN) return new Response('', {
        status: 403
    })

    const searchParams = new URL(request.url).searchParams
    const {route, ...options} = Object.fromEntries(searchParams.entries()) as RequestParameters

    if (!route) {
        return new Response('', {
            status: 500
        })
    }

    setHeaders({
        "cache-control": `max-age=${12 * 60}`
    })

    const response = (response:Awaited<ReturnType<typeof octokit['request']>>) => {
        return new Response(JSON.stringify(response.data), {
            status: response.status,
        })
    }

    try {
        const res = await octokit.request(`${route}`, options)
        if (res.status !== 200) {
            throw new Error(JSON.stringify(res))
        }
        return response(res)
    } catch (error) {
        //@ts-ignore
        return response(error.response)
    }

}