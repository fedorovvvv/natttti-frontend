import { BaseAuthStore, PocketBase, type AuthModel } from 'pocketbase'
import type Client from "pocketbase"
import type { IUser } from '$entities/users/types'

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			pb:PocketBase
			user?:AuthModel
			accessToken?:string
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {}
