import { BaseAuthStore, PocketBase, type AuthModel } from 'pocketbase'
import type Client from "pocketbase"
import type { UserRecord } from '$entities/users'

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			pb:PocketBase
			user?:UserRecord | null
			accessToken?:string
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {}
