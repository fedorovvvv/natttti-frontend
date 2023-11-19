import { pb } from "$shared/api/pocketbase";
import type { GiftEventRecord } from "../types";

export const getGiftEventsCollection = (pbInstance = pb) => pbInstance.collection<GiftEventRecord>('giftEvents')