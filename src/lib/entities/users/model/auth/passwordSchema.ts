import { object, string } from "yup"

export const createUserAuthPasswordSchema = () => {
    const schema = object({
        identity: string().required(),
        password: string().required()
    })
    return schema
}