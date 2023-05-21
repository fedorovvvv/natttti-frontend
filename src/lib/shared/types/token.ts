export enum TokenAccessTypes {
    User = 0,
    Admin = 1,
    Full = 2
}

export interface IToken {
    id: number
    issuedAt: string
    expiresAt: string
    grantedTo: string
    accessToken: string
    accessType: TokenAccessTypes
}