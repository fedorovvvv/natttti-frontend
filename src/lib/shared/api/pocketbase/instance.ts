import PocketBase from 'pocketbase'
import type { TypedPocketBase } from './types'
import { PUBLIC_PB_URL } from '$env/static/public'

export const createPocketBaseInstance = () => new PocketBase(PUBLIC_PB_URL, null, 'ru') as TypedPocketBase

export const pb = createPocketBaseInstance()
