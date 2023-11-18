<script lang='ts'>
	import { SectionContainer } from "$shared/ui/Section";

    interface $$Props {
        class?:string
    }
    
    let className = ''
    export { className as class }
    
</script>

<main class={`account-layout ${className}`}>
    <slot/>
</main>

<style lang='sass'>
    .account-layout
        padding-top: 100px
</style>