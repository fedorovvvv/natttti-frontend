/**
 * This file was @generated using pocketbase-typegen
 */

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Addresses = 'addresses',
	Events = 'events',
	GiftEventMembers = 'giftEventMembers',
	GiftEvents = 'giftEvents',
	Gifts = 'gifts',
	HackathonEvents = 'hackathonEvents',
	Projects = 'projects',
	Socials = 'socials',
	Sponsors = 'sponsors',
	Teams = 'teams',
	Users = 'users'
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type AddressesRecord = {
	name?: string
	country: string
	city: string
}

export type EventsRecord = {
	description?: HTMLString
	endAt?: IsoDateString
	name: string
	owners?: RecordIdString[]
	isRegistrationOpen?: boolean
	startAt?: IsoDateString
}

export type GiftEventMembersRecord = {
	gifts?: RecordIdString[]
	targets?: RecordIdString[]
	user?: RecordIdString
}

export type GiftEventsRecord = {
	event: RecordIdString
	members?: RecordIdString[]
	maxPrice?: number
}

export type GiftsRecord = {
	name: string
}

export type HackathonEventsRecord = {
	event: RecordIdString
	sponsors?: RecordIdString[]
	teams?: RecordIdString[]
}

export type ProjectsRecord = {
	description?: string
	gitUrl: string
	isReady?: boolean
	likeCount?: number
	name: string
}

export type SocialsRecord = {
	gitHubUsername?: string
	gitLabUsername?: string
	telegramUsername?: string
}

export type SponsorsRecord = {
	gifts?: RecordIdString[]
	members?: RecordIdString[]
	name: string
}

export type TeamsRecord = {
	members?: RecordIdString[]
	name: string
	organizationGitUrl?: string
	projects?: RecordIdString[]
}

export type UsersRecord = {
	avatar?: string
	firstName: string
	gitHubUrl?: string
	gitHubUsername?: string
	gitLabUsername?: string
	isAdmin?: boolean
	isDeveloper?: boolean
	lastName: string
	socials?: RecordIdString
	telegramUsername?: string
}

// Response types include system fields and match responses from the PocketBase API
export type AddressesResponse<Texpand = unknown> = Required<AddressesRecord> & BaseSystemFields<Texpand>
export type EventsResponse<Texpand = unknown> = Required<EventsRecord> & BaseSystemFields<Texpand>
export type GiftEventMembersResponse<Texpand = unknown> = Required<GiftEventMembersRecord> & BaseSystemFields<Texpand>
export type GiftEventsResponse<Texpand = unknown> = Required<GiftEventsRecord> & BaseSystemFields<Texpand>
export type GiftsResponse<Texpand = unknown> = Required<GiftsRecord> & BaseSystemFields<Texpand>
export type HackathonEventsResponse<Texpand = unknown> = Required<HackathonEventsRecord> & BaseSystemFields<Texpand>
export type ProjectsResponse<Texpand = unknown> = Required<ProjectsRecord> & BaseSystemFields<Texpand>
export type SocialsResponse<Texpand = unknown> = Required<SocialsRecord> & BaseSystemFields<Texpand>
export type SponsorsResponse<Texpand = unknown> = Required<SponsorsRecord> & BaseSystemFields<Texpand>
export type TeamsResponse<Texpand = unknown> = Required<TeamsRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	addresses: AddressesRecord
	events: EventsRecord
	giftEventMembers: GiftEventMembersRecord
	giftEvents: GiftEventsRecord
	gifts: GiftsRecord
	hackathonEvents: HackathonEventsRecord
	projects: ProjectsRecord
	socials: SocialsRecord
	sponsors: SponsorsRecord
	teams: TeamsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	addresses: AddressesResponse
	events: EventsResponse
	giftEventMembers: GiftEventMembersResponse
	giftEvents: GiftEventsResponse
	gifts: GiftsResponse
	hackathonEvents: HackathonEventsResponse
	projects: ProjectsResponse
	socials: SocialsResponse
	sponsors: SponsorsResponse
	teams: TeamsResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'addresses'): RecordService<AddressesResponse>
	collection(idOrName: 'events'): RecordService<EventsResponse>
	collection(idOrName: 'giftEventMembers'): RecordService<GiftEventMembersResponse>
	collection(idOrName: 'giftEvents'): RecordService<GiftEventsResponse>
	collection(idOrName: 'gifts'): RecordService<GiftsResponse>
	collection(idOrName: 'hackathonEvents'): RecordService<HackathonEventsResponse>
	collection(idOrName: 'projects'): RecordService<ProjectsResponse>
	collection(idOrName: 'socials'): RecordService<SocialsResponse>
	collection(idOrName: 'sponsors'): RecordService<SponsorsResponse>
	collection(idOrName: 'teams'): RecordService<TeamsResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
