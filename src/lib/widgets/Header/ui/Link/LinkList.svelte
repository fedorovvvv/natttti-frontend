<script lang='ts'>
    interface $$Props {
        class?:string
    }
    
    let className = ''
    export { className as class }
    
</script>

<div class={`HeaderLinkList ${className}`}>
    <slot/>
</div>

<style lang='sass'>
    .List
        display: flex
        align-items: center
        gap: 10px
</style>