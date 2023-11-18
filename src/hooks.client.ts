import { userStore } from '$appLayer/stores/user'
import type { UserRecord } from '$entities/users'
import { pb } from '$shared/api/pocketbase'

pb.authStore.loadFromCookie(document.cookie)
pb.authStore.onChange(() => {
    userStore.set(pb.authStore.model as UserRecord)
    document.cookie = pb.authStore.exportToCookie({ httpOnly: true, secure: true, sameSite: 'lax' })
}, true)