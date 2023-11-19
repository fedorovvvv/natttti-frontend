/* eslint-disable boundaries/element-types */
import { date, object, string } from "yup"
import { PocketBaseSchema } from "$shared/model"

export class GiftEventsSchema {
    static fields = object({
        name: string().default('').required(),
        description: string().default(''),
        startAt: date().required(),
        endAt: date().required(),
    })

    static base = this.fields.concat(PocketBaseSchema.base)

    static create = this.fields

    static update = this.fields

    static record = this.base.concat(PocketBaseSchema.base)
}