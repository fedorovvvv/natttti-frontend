import type { MaybeStore } from '$shared/types/Store'

type ToastTypeData = {
	default: unknown
	error: unknown
	warning: unknown
	success: unknown
	progress: {
		/** A value between 0 and 100
		 *
		 * If a store is passed in a toast will subscribe to it.
		 *
		 * If it's a regular value you would have to update it using an updateToast function */
		progress?: MaybeStore<number>
	}
}

export type ToastType = keyof ToastTypeData
export type ToastData<TType extends ToastType = ToastType> = TType extends TType
	? {
			type: TType
			description: string
			/** Displays an action button  */
			action?: {
				label: string
				onClick: () => void
				/** Whether onClick handler should also close the toast */
				closeOnClick?: boolean
			}
			/** This callback will be called when a toast is closed */
			onClose?: () => void
	  } & ToastTypeData[TType]
	: never
