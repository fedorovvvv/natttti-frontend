import type { Readable } from 'svelte/store'
import type { MaybeStore } from '$shared/types/Store'

export function isSvelteStore<T>(value: MaybeStore<T>): value is Readable<T> {
	return (
		typeof value === 'object' &&
		value &&
		'subscribe' in value &&
		typeof value.subscribe === 'function'
	)
}

export { default as MaybeStoreValue } from './MaybeStoreValue.svelte'
