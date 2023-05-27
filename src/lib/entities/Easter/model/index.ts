import type { Writable } from "svelte/store";
import { Context } from "$shared/lib/Context";

export class EasterContext extends Context<Writable<{
    date:Date
}>> {
    constructor() {
        super('eaterContext')
    }
}