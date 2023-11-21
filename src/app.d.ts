import { BaseAuthStore, PocketBase, type AuthModel } from 'pocketbase'
import type Client from "pocketbase"
import type { UsersResponse, createPocketBaseInstance } from '$shared/api/pocketbase'

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			pb:ReturnType<typeof createPocketBaseInstance>
			user?:UsersResponse | null
			accessToken?:string
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {}
