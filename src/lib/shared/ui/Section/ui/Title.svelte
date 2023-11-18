<script lang='ts'>
    interface $$Props {
        class?:string
    }
    
    let className = ''
    export { className as class }
    
</script>

<div class={`SectionTitle ${className}`}>
    <slot/>
</div>

<style lang='sass'>
    .SectionTitle
        text-align: center
        margin-left: auto
        margin-right: auto
        p
            @at-root :global &
                color: var(--gray400)
                margin-top: 5px
</style>