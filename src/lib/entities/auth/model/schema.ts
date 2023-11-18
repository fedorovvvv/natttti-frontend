import { boolean, object, ref, string } from "yup"

export const createAuthSchema = () => {
    return object({
        username: string().default(null),
        email: string().default('').email(),
        emailVisibility: boolean().default(false),
    })
}

export const createAuthCreateSchema = () => {
    const password = string().min(8).max(60).default('').required()
    return createAuthSchema().concat(object({
        password,
        passwordConfirm: password.oneOf([ref('password')], 'Пароли не совпадают'),
    }))
}

export const createAuthPasswordSchema = () => {
    return object({
        identity: string().default('').required(),
        password: string().default('').required()
    })
}