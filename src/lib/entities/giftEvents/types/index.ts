import type { InferType } from 'yup'
import type { GiftEventsSchema } from '../model/schema'

export type GiftEventCreate = InferType<typeof GiftEventsSchema.create>
export type GiftEventUpdate = InferType<typeof GiftEventsSchema.update>
