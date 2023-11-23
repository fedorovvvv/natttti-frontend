import _ from 'lodash'
import { get, writable } from 'svelte/store'
import type { SocialsRecord, SocialsResponse, UsersResponse } from '$shared/api/pocketbase'
import { UsersSchema } from './schema'

export const createUserStore = () => {
	const { set, update, subscribe } = writable<{
		current?: UsersResponse | null
		socials?: SocialsRecord | null
		isLoggedIn: boolean
	}>({
		current: undefined,
		isLoggedIn: false
	})

	const setUser = (user?: UsersResponse | null) => {
		update((data) => {
			data.isLoggedIn = !!user
			data.current = user
			return data
		})
	}

	const setSocials = (socials?: SocialsRecord | null) => {
		update((data) => {
			data.socials
			return data
		})
	}

	const clone = () => {
		const current = get({ subscribe }).current
		return current
	}

	return {
		set: setUser,
		setSocials,
		subscribe,
		clone
	}
}
