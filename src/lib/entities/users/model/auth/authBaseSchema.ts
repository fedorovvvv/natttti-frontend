import { boolean, object, ref, string, type InferType } from "yup"

export const createAuthBaseSchema = () => {
    const password = string().min(8).max(60).default('').required()
    return object({
        username: string().default(null),
        email: string().default('').email(),
        emailVisibility: boolean().default(false),
        password,
        passwordConfirm: password.oneOf([ref('password')], 'Пароли не совпадают'),
    })
}

export const createAuthBaseSchemaFields = ():InferType<ReturnType<typeof createAuthBaseSchema>> => {
    return {
        username: '',
        email: '',
        emailVisibility: false,
        password: '',
        passwordConfirm: '',
    }
}