import { date, object, string } from "yup"

export const createBaseSchema = () => {
    return object({
        id: string().default('').required(),
        created: date().required(),
        updated: date().required(),
    })    
}