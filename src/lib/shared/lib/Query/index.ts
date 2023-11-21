export class QueryBase<TQueryFn extends (...params:never[]) => unknown> {
    key
    #queryFn
    constructor(key:string, queryFn:TQueryFn) {
        this.key = key
        this.#queryFn = queryFn
    }

    queryFn({queryKey}:{queryKey:[string, ...Parameters<TQueryFn>]}) {
        const [, ...data] = queryKey
        return this.#queryFn(...data) as ReturnType<TQueryFn>
    }

    createKey(...data:Parameters<TQueryFn>) {
        return [this.key, ...data] as [typeof this.key, ...typeof data]
    }

}