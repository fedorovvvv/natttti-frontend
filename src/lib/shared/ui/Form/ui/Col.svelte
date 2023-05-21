<script lang='ts'>
    interface $$Props {
        class?:string
    }
    
    let className = ''
    export { className as class }
    
</script>

<div class={`FormCol ${className}`}>
    <slot/>
</div>

<style lang='sass'>
    .FormCol
        display: grid
        grid-template-columns: 1fr
        gap: var(--gap)
</style>