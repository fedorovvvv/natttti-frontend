import type { InferType } from "yup";
import type { createUserRecordSchema, createUserSchema } from "../model/schema";

export type User = InferType<ReturnType<typeof createUserSchema>>
export type UserRecord = InferType<ReturnType<typeof createUserRecordSchema>>