import { createToaster } from '@melt-ui/svelte'
import type { ToastData } from '../types'

const toasterStore = createToaster<ToastData>()
const { addToast, removeToast, updateToast } = toasterStore.helpers

// todo - HMR breaks toast triggers, full page reload fixes it
const createToast = (...args: Parameters<typeof addToast>) => {
	const toastData = addToast(...args)
	return {
		data: toastData,
		close: () => removeToast(toastData.id),
		update: (data: ToastData) => updateToast(toastData.id, data)
	}
}
const closeToast = removeToast

export { closeToast, createToast, toasterStore, updateToast }
