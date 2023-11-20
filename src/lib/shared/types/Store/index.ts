import type { Readable } from 'svelte/store';

export type MaybeStore<T> = T | Readable<T>;
