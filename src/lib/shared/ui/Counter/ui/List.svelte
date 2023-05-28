<script lang='ts'>
	import { setContext } from "svelte";

    interface $$Props {
        class?:string
    }
    
    let className = ''
    export { className as class }

    setContext('counterList', {})
    
</script>

<ul class={`CounterList ${className}`}>
    <slot/>
</ul>

<style lang='sass'>
    .CounterList
        $root: &
        display: flex
        .Counter
            :global  &
                &:not(:last-child)
                    margin-right: 20px
</style>