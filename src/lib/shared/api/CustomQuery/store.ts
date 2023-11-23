import {
	createQuery,
	type StoreOrVal,
	type UndefinedInitialDataOptions
} from '@tanstack/svelte-query'
import { derived, type Readable } from 'svelte/store'

export const createQueryDataStore = <
	T extends Parameters<typeof derived>[0],
	U extends Parameters<typeof derived<T, UndefinedInitialDataOptions>>[1]
>(
	stores: T,
	fn: U
) => {
	return derived(stores, fn)
}

export const createQueryStore = (data: ReturnType<typeof createQueryDataStore>) => {
	type Data = ReturnType<typeof createQueryDataStore> extends Readable<infer R> ? R : never
	return createQuery(data as Data)
}
