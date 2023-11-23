// import { get, readable, type Readable } from "svelte/store"
// import { CustomQuery } from "$shared/api/CustomQuery"
// import { pb } from "$shared/api/PocketBase"
// import type { RecordModel, RecordService } from "pocketbase"
// import type { IUser } from "$entities/users/types"

// export const createProjectsQuery = () => {
//     const collection = pb.collection<IUser>('projects')
//     const method = <T extends keyof typeof collection>(methodName:T) => {
//         type Method = typeof collection[T]
//         type MethodParameters = Method extends ((...args:never[]) => unknown) ? Parameters<Method> : []
//         type MethodReturn = Method extends ((...args:never[]) => unknown) ? Awaited<ReturnType<Method>> : never

//         return new CustomQuery<MethodParameters, ['projects'], MethodReturn>(['projects'], async (data) => {
//             const [name, ...restOptions] = data.queryKey
//             //@ts-ignore
//             return await collection[methodName](...restOptions)
//         })
//     }
//     return method
// }

// const test = createProjectsQuery()

// get(test('getFullList').create([readable(1), readable()])).data

// test('getFullList').data
