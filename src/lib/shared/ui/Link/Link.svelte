<script lang='ts'>
	import type { HTMLAnchorAttributes } from "svelte/elements";

    interface $$Props extends HTMLAnchorAttributes {
        class?:string
    }
    
    let className = ''
    export { className as class }
    export let href:$$Props['href'] = undefined
    
</script>

<a class={`Link ${className}`} {href} {...$$restProps}>
    <slot/>
</a>

<style lang="sass">
    .Link
        font-size: 14px
        font-weight: 500
        color: var(--clue-color-active-500)
        transition: .3s ease-in-out
        transition-property: color
        &:hover
            color: var(--clue-color-active-600)
</style>