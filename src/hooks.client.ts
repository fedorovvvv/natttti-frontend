import type { SerializeOptions } from 'pocketbase'
import { userStore } from '$entities/users'
import { pb, type UsersResponse } from '$shared/api/pocketbase'
import { CONFIG } from '$shared/config'

pb.authStore.loadFromCookie(document.cookie)
pb.authStore.onChange(() => {
	userStore.set(pb.authStore.model as UsersResponse)
	document.cookie = pb.authStore.exportToCookie(CONFIG.COOKIES.OPTIONS as SerializeOptions)
}, true)
