import type { AdminModel, RecordModel } from "pocketbase"

export interface IUser extends AdminModel, RecordModel {
    username:string
    verified: false
    emailVisibility: true
    firstName: string
    lastName: string
    gitHubUrl?: string
    gitLabUrl?: string
    telegramUrl?: string
}