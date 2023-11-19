import { object, string } from "yup"
import { PocketBaseAuthSchema } from "$shared/model"
import { PocketBaseSchema } from "$shared/model"
export class UsersSchema {
    static fields = object({
        firstName: string().default('').required(),
        lastName: string().default('').required(),
        avatar: string().default(''),
        gitHubUrl: string().default('').url(),
        gitLabUrl: string().default('').url(),
        telegramUrl: string().default('').url(),
    })

    static base = this.fields.concat(PocketBaseAuthSchema.fields)

    static create = this.fields.concat(PocketBaseAuthSchema.create)

    static update = this.base
    
    static record = this.base.concat(PocketBaseSchema.base)
}