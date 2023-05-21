<script lang='ts'>
    interface $$Props {
        class?:string
    }
    
    let className = ''
    export { className as class }
    
</script>

<div class={`Container ${className}`}>
    <slot/>
</div>

<style lang='sass'>
    .Container
        width: 100%
        max-width: 1200px
        margin-left: auto
        margin-right: auto
        padding-left: var(--containerPadding)
        padding-right: var(--containerPadding)
</style>