import { pb } from "$shared/api/pocketbase";

export const getGiftEventsCollection = (pbInstance = pb) => pbInstance.collection('giftEvents')