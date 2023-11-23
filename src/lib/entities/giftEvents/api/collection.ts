import { pb } from '$shared/api/pocketbase'
import type { GiftEvent } from '../types'

export const getGiftEventsCollection = (pbInstance = pb) => pbInstance.collection('giftEvents') //deprecated
