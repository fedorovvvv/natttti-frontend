import { writable } from "svelte/store"

export const createProjectsStore = () => {
    const {set, update, subscribe} = writable()

    return {
        subscribe
    }
}