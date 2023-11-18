/* eslint-disable boundaries/element-types */
import { object, string } from "yup"
import { createAuthCreateSchema, createAuthSchema } from "$entities/auth"
import { createBaseSchema } from "$shared/model/base"

export const createUserBaseSchema = () => {
    return object({
        firstName: string().default('').required(),
        lastName: string().default('').required(),
        avatar: string().default(''),
        gitHubUrl: string().default('').url(),
        gitLabUrl: string().default('').url(),
        telegramUrl: string().default('').url(),
    })
}

export const createUserCreateSchema = () => {
    return createUserBaseSchema().concat(createAuthCreateSchema())
}

export const createUserSchema = () => {
    return createUserBaseSchema().concat(createAuthSchema())
}

export const createUserUpdateSchema = () => {
    return createUserBaseSchema().concat(createAuthSchema())
}

export const createUserRecordSchema = () => {
    return createUserSchema().concat(createBaseSchema())
}