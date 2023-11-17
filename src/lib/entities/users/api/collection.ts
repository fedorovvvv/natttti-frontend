import { pb } from "$shared/api/pocketbase";
import type { IUser } from "../types";

export const getUsersCollection = (pbInstance = pb) => pbInstance.collection<IUser>('users')