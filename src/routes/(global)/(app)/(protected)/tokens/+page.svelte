<script lang='ts'>
	import { Tokens } from "$features/Tokens";
	import { CONFIG } from "$shared/config";
	import { SectionContainer } from "$shared/ui/Section";

    interface $$Props {
        class?:string
    }
    
    let className = ''
    export { className as class }
    
</script>

<svelte:head>
    <title>{CONFIG.APP.NAME} | Токены</title>
</svelte:head>

<main class={`tokens-page ${className}`}>
    <SectionContainer>
        <Tokens/>
    </SectionContainer>
</main>

<style lang='sass'>
    .tokens-page
        padding-top: 100px
</style>