type ToastTypeData = {
	default: unknown;
	error: unknown;
	warning: unknown;
	success: unknown;
	progress: { cancel?: () => void; progress?: number };
};
export type ToastType = keyof ToastTypeData;
export type ToastData<TType extends ToastType = ToastType> = TType extends TType
	? {
			type: TType;
			description: string;
	  } & ToastTypeData[TType]
	: never;
