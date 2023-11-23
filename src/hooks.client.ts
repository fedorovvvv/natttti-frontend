import { userStore } from '$appLayer/stores/user'
import { pb, type UsersResponse } from '$shared/api/pocketbase'
import { dev } from '$app/environment'

pb.authStore.loadFromCookie(document.cookie)
pb.authStore.onChange(() => {
	userStore.set(pb.authStore.model as UsersResponse)
	document.cookie = pb.authStore.exportToCookie(
		dev ? { httpOnly: false } : { httpOnly: true, secure: true, sameSite: 'lax' }
	)
}, true)
