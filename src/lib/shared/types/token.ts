export enum ETokenAccessTypes {
	User = 1,
	Admin = 2,
	Full = 3
}

export interface IToken {
	id: number
	issuedAt: string
	expiresAt: string | Date
	grantedTo: string
	accessToken: string
	accessType: ETokenAccessTypes
}
