import type { Writable } from "svelte/store";
import { Context } from "$shared/lib/Context";

export class EasterContext extends Context<Writable<{
    date:Date
    isDevToolsOpen: boolean
    isDevToolsChange: boolean
}>> {
    constructor() {
        super('eaterContext')
    }
}