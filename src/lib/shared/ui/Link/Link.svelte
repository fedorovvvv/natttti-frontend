<script lang='ts'>
	import type { HTMLLinkAttributes } from "svelte/elements";

    interface $$Props extends HTMLLinkAttributes {
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
        color: var(--blue300)
        &::hover
            color: var(--blue400)
</style>