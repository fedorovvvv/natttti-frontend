import { boolean, object, ref, string, type InferType } from "yup"

export const createAuthBaseSchema = () => {
    return object({
        username: string().default(null),
        email: string().default('').email(),
        emailVisibility: boolean().default(false),
        password: string().default('').required(),
        passwordConfirm: string().default('').required().oneOf([ref('password')], 'Пароли не совпадают'),
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