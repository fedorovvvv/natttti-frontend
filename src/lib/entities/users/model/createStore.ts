import _ from "lodash"
import { get, writable } from "svelte/store"
import type{ UserRecord } from '../types'
import { createUserSchema } from "./schema"

export const createUserStore = () => {
    const {set, update, subscribe} = writable<{
        current?:UserRecord | null
        isLoggedIn: boolean
    }>({
        current:undefined,
        isLoggedIn: false
    })

    const setUser = (user?:UserRecord | null) => {
        update(data => {
            data.isLoggedIn = !!user
            data.current = user
            return data
        })
    }

    const clone = () => {
        const current = get({subscribe}).current
        return current ? _.cloneDeep(current) : createUserSchema().getDefault()
    }

    return {
        set: setUser,
        subscribe,
        clone
    }
}