/* eslint-disable boundaries/element-types */
import { object, string } from 'yup'
import { SocialsSchema } from '$entities/socials'
import type { UsersRecord } from '$shared/api/pocketbase'
import { PocketBaseAuthSchema } from '$shared/model'
import { PocketBaseSchema } from '$shared/model'
export class UsersSchema {
	static record = object({
		firstName: string().default('').required(),
		lastName: string().default('').required(),
		avatar: string().default(''),
		socials: string().default('')
	})

	static base = this.record.concat(PocketBaseAuthSchema.fields)

	static create = this.record.concat(PocketBaseAuthSchema.create)

	static update = this.base

	static response = this.base.concat(PocketBaseSchema.response)
}
