import { boolean, object, ref, string } from "yup"

export const createAuthSchema = () => {
    const password = string().min(8).max(60).default('').required()
    return object({
        username: string().default(null),
        email: string().default('').email(),
        emailVisibility: boolean().default(false),
        password,
        passwordConfirm: password.oneOf([ref('password')], 'Пароли не совпадают'),
    })
}