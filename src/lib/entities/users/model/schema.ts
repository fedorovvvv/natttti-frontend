import { object, string } from "yup"
import { createAuthBaseSchema } from "./auth/authBaseSchema"

export const createUserBaseSchema = () => {
    return object({
        firstName: string().default(''),
        lastName: string().default(''),
        avatar: string().default(''),
        gitHubUrl: string().default('').url(),
        gitLabUrl: string().default('').url(),
        telegramUrl: string().default('').url(),
    })
}

export const createUserSchema = () => {
    return createUserBaseSchema().concat(createAuthBaseSchema())
}