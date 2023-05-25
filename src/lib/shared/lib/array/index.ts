/* eslint-disable @typescript-eslint/no-explicit-any */
export function compare(a1:unknown[], a2:unknown[]) {
    return a1.length == a2.length && a1.every((v, i) => v === a2[i])
}

export function contains(where:unknown[], what:unknown[], any = true){
    for(let i=0; i<what.length; i++){
        if (any) {
            if(where.indexOf(what[i]) !== -1) return true
        } else {
            if(where.indexOf(what[i]) === -1) return false;
        }
    }
    return !any;
}

export const findNearest = (val:number, arr:number[]) => {
    if (!val || !(arr.length > 0)) return
    return arr?.reduce((a,c) => Math.abs(a-val) < Math.abs(c-val) ? a: c)
}

export const unifyArray = (arr:any[]) => {
    return arr && Array.from(new Set([...arr]))
}

export const unifyArrayOfObject = (arr:{[index:string]:any}[], key:string) => {
    return arr.filter((n, i, a) => n === a.find(m => m && n &&  m[key] === n[key]))
}