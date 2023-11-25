/* eslint-disable boundaries/element-types */
import { array, date, object, string } from 'yup'
import { GiftEventMembersSchema } from '$entities/giftEventMembers'
import { PocketBaseSchema } from '$shared/model'

export class GiftEventsSchema {
	static fields = object({
		name: string().default('').required(),
		description: string().default(''),
		startAt: date().required(),
		endAt: date().required(),
		members: array(GiftEventMembersSchema.record).default([]).required()
	})

	static create = this.fields

	static update = this.fields
	
	static registration = GiftEventMembersSchema.fields.pick(['description'])

	static record = this.fields.concat(PocketBaseSchema.base)
}
