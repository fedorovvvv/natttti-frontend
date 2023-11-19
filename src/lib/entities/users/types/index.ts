import type { InferType } from "yup";
import type { UsersSchema } from "../model/schema";

export type User = InferType<typeof UsersSchema.base>
export type UserRecord = InferType<typeof UsersSchema.record>