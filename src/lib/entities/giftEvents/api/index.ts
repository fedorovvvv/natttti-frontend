import { pb, type GiftEventsResponse, type EventsResponse, type GiftEventMembersResponse, type UsersResponse } from "$shared/api/pocketbase";
import { QueryBase } from "$shared/lib/Query";

export class GiftEventsQueries {
    static collection = pb.collection('giftEvents')

    static getOne = new QueryBase(
        'giftEvents.getOne',
        async (id:string) => {
            return await this.collection.getOne<GiftEventsResponse<{
                event: EventsResponse
            }>>(id, {
                expand: 'event'
            })
        }
    )

    static isUserRegistered = new QueryBase(
        'giftEvents.isUserRegistered',
        async (giftEventId:string, userId:string) => {
            const giftEvent = await this.collection.getOne<GiftEventsResponse<{
                members: GiftEventMembersResponse<{
                    user: UsersResponse
                }>[]
            }>>(giftEventId, {
                expand: 'members.user',
                fields: 'expand.members.user'
            })
            return {
                result: !!giftEvent.expand?.members?.some((member) => member.user === userId),
                members: giftEvent.expand?.members
            }
        }
    )
}