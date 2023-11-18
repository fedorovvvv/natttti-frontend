import type { InferType } from "yup";
import type { createUserSchema } from "../model/schema";

export type User = InferType<ReturnType<typeof createUserSchema>>