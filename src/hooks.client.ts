import { userStore } from '$appLayer/stores/user'
import type { IUser } from '$entities/users/types'
import { pb } from '$shared/api/pocketbase'

pb.authStore.loadFromCookie(document.cookie)
pb.authStore.onChange(() => {
    userStore.set(pb.authStore.model as IUser)
    document.cookie = pb.authStore.exportToCookie({ httpOnly: true, secure: true, sameSite: 'lax' })
}, true)