<script lang='ts'>
	import { hasContext, onDestroy, onMount } from "svelte";

	import type { ApiOkReturn, ApiReturn } from "$shared/lib/Api";


    type Loader = $$Generic<() => ApiReturn<unknown>>
    interface $$Props {
        class?:string
        tag?:string
        loader:Loader
    }
    
    interface $$Slots {
        default: {
            data: typeof data
            count: number
        }
    }

    let className = ''
    export { className as class }
    export let tag:$$Props['tag'] = hasContext('counterList') ? 'li' : 'div'
    export let loader:$$Props['loader']
    export let count = 0

    let duration = 20 * 1000

    export let data:Awaited<ApiOkReturn<ReturnType<Loader>>> | undefined = undefined

    const controller:{
        set: (newData:typeof data) => void
        loadTimeout?: ReturnType<typeof setTimeout>
        stopLoad:VoidFunction
        load:VoidFunction
    } = {
        set(newData) {
            data = newData
        },
        loadTimeout: undefined satisfies undefined |  ReturnType<typeof setTimeout>,
        stopLoad() {
            clearTimeout(this.loadTimeout)
        },
        load() {
            this.stopLoad()
            loader().then(res => {
                count++
                if (res._error) {
                    this.set(undefined)
                } else {
                    //@ts-ignore
                    this.set(res)
                }
                controller.loadTimeout = setTimeout(() => {
                    this.load()
                }, duration)
            })
        }
    }
    onMount(() => {
        controller.load()
    })

    onDestroy(() => {
        controller.stopLoad()
    })
    
</script>

<svelte:element this={tag} class={`StatsCounterList ${className}`}>
    <slot {data} {count}/>
</svelte:element>

<!-- <style lang='sass'>
    .StatsCounterList
</style> -->