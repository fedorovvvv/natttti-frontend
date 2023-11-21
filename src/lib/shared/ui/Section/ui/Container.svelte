<script lang='ts'>
    interface $$Props {
        class?:string
        tag?:string
    }
    
    let className = ''
    export { className as class }
    export let tag:$$Props['tag'] = 'div'
    
</script>

<svelte:element this={tag} class={`SectionContainer ${className}`}>
    <slot/>
</svelte:element>

<style lang='sass'>
    .SectionContainer
        width: 100%
        max-width: 1200px
        margin-left: auto
        margin-right: auto
        padding-left: var(--containerPadding)
        padding-right: var(--containerPadding)
        .SectionTitle
            @at-root :global &
                margin-bottom: 60px
</style>