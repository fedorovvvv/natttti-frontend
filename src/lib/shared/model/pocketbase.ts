import { boolean, date, object, ref, string } from "yup";

export class PocketBaseSchema {
    static base = object({
        id: string().default('').required(),
        created: date().required(),
        updated: date().required(),
    })    
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