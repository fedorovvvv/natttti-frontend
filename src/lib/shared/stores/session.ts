import { writable } from "svelte/store";

export const session = writable<App.Locals>({})