import { pb } from "$shared/api/pocketbase";
import type { User } from "../types";

export const getUsersCollection = (pbInstance = pb) => pbInstance.collection<User>('users')