import { object, string } from "yup"
import { createAuthSchema } from "$entities/auth"

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

export const createUserSchema = () => {
    return createUserBaseSchema().concat(createAuthSchema())
}