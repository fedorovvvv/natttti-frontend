export * from './store'
import { createQuery, type QueryFunction, type QueryKey, type QueryOptions, type UndefinedInitialDataOptions } from "@tanstack/svelte-query";
import { derived, get, type Readable } from "svelte/store";

type CustomQueryOptions = Omit<UndefinedInitialDataOptions, 'queryKey' | 'queryFn'>

type CustomQueryData = unknown[]

type CustomQueryDataResult<T extends CustomQueryData> = {
    [K in keyof T]: T[K] extends Readable<infer R> ? R : T[K]
}

export class CustomQuery<TData extends CustomQueryData, TKey extends QueryKey, TQueryFnData = unknown> {
    queryKey
    options
    queryFn
    data
    constructor(
        queryKey:TKey,
        queryFn:QueryFunction<TData, [...TKey, ...TData], never>, 
        options?:CustomQueryOptions
    ) {
        this.queryKey = queryKey
        this.queryFn = queryFn
        this.options = options
        this.data = {} as TQueryFnData
    }
    create(data:{
        [K in keyof TData]: Readable<TData[K]>
    }) {
        return createQuery<TQueryFnData, Error, TQueryFnData, [...TKey, ...TData]>(
            //@ts-ignore
            derived(data, ([...$data]) => {
                return {
                    ...this.options,
                    queryKey: [...this.queryKey, ...$data],
                    queryFn: this.queryFn,
                }
            })
        )
    }
}