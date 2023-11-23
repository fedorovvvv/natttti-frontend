import { object, string } from 'yup'
import type { SocialsRecord } from '$shared/api/pocketbase'
import { PocketBaseSchema } from '$shared/model'

export class SocialsSchema {
	static record = object<SocialsRecord>({
		gitHubUsername: string().max(40).default(''),
		gitLabUsername: string().max(40).default(''),
		telegramUsername: string().max(40).default('')
	})

	static create = this.record

	static update = this.record

	static response = this.record.concat(PocketBaseSchema.response)
}
