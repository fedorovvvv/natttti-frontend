import type { InferType } from 'yup'
import type { GiftEventsSchema } from '../model/schema'

export type GiftEvent = InferType<typeof GiftEventsSchema.record>
export type GiftEventFields = InferType<typeof GiftEventsSchema.fields>
export type GiftEventCreate = InferType<typeof GiftEventsSchema.create>
export type GiftEventUpdate = InferType<typeof GiftEventsSchema.update>
