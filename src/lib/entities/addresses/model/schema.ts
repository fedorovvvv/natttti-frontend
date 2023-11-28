import { object, string, type AnyObject } from 'yup'
import type { AddressesRecord } from '$shared/api/pocketbase'
import { PocketBaseSchema } from '$shared/model'

export class AddressesSchema {
	static fields = object({
		name: string()
			.default(null as unknown as undefined)
			.optional(), // "as unknown as undefined" - fix for TextField
		country: string().default('').required(),
		city: string().default('').required()
	})

	static create = this.fields

	static update = this.fields

	static record = this.fields.concat(PocketBaseSchema.base)
}
