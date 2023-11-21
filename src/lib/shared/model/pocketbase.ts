import { boolean, date, object, ref, string } from "yup";
import type { BaseSystemFields } from "$shared/api/pocketbase";

export class PocketBaseSchema {
    static base = object<Pick<BaseSystemFields, 'id' | 'created' | 'updated'>>({
        id: string().default('').required(),
        created: date().required(),
        updated: date().required(),
    })    
    
    static response = this.base.concat(object({
        collectionId: string().required(),
        collectionName: string().required(),
        expand: object().optional()
    }))
}

export class PocketBaseAuthSchema {
    static fields = object({
        username: string().default(null),
        email: string().default('').email(),
        emailVisibility: boolean().default(false),
    })

    static passwordFields = string().min(8).max(60).default('').required()

    static passwordCreate = object({
        password: this.passwordFields,
        passwordConfirm: this.passwordFields.oneOf([ref('password')], 'Пароли не совпадают'),
    })
    
    static create = this.fields.concat(this.passwordCreate)

    static withPassword = object({
        identity: string().default('').required(),
    }).concat(this.passwordCreate.pick(['password']))
}