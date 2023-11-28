import type PocketBase from 'pocketbase'
import { pb } from './instance'
export * from './types'
export * from './instance'

export class PocketBaseApi {
    client
    fetch
    constructor(client = pb, _fetch = fetch) {
        this.client = client
        this.fetch = _fetch
    }
}