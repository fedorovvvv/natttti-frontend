<script lang='ts'>
	import type { HTMLAnchorAttributes } from "svelte/elements";

    interface $$Props extends HTMLAnchorAttributes {
        class?:string
    }
    
    let className = ''
    export { className as class }
    export let href:$$Props['href'] = undefined
    
</script>

<a class={`HeaderLink ${className}`} {href} {...$$restProps}>
    <slot/>
</a>

<style lang='sass'>
    .HeaderLink
        display: block
        width: 26px
        height: 26px
        opacity: .8
        transition: .3s ease-in-out
        transition-property: opacity
        &:hover
            opacity: 1
        img
            @at-root :global &
                width: 100%
                height: 100%
                object-fit: contain
                object-position: center center
</style>