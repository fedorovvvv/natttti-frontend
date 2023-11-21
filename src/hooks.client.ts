import { userStore } from '$appLayer/stores/user'
import { pb, type UsersResponse } from '$shared/api/pocketbase'

pb.authStore.loadFromCookie(document.cookie)
pb.authStore.onChange(() => {
    userStore.set(pb.authStore.model as UsersResponse)
    document.cookie = pb.authStore.exportToCookie({ httpOnly: false })
}, true)