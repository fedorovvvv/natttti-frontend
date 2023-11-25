/* eslint-disable boundaries/element-types */
import { array, object, string } from 'yup'
import { UsersSchema } from '$entities/users'
import { PocketBaseSchema } from '$shared/model'

export class GiftEventMembersSchema {
	static fields = object({
		user: UsersSchema.response,
		description: string().default(''),
		targets: array(UsersSchema.response).default([]),
		gifts: array().default([])
	})

	static create = this.fields

	static update = this.fields

	static record = this.fields.concat(PocketBaseSchema.base)
}
