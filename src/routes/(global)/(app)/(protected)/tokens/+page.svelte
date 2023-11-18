<script lang='ts'>
	import { Tokens } from "$features/Tokens";
	import { CONFIG } from "$shared/config";
	import { SectionContainer } from "$shared/ui/Section";
	import { writable } from "svelte/store";
	import type { PageData } from "./$types";

    interface $$Props {
        class?:string
        data:PageData
    }
    
    let className = ''
    export { className as class }
    export let data

    const allTokens = writable(data.allTokens)
    $: allTokens.set(data.allTokens)
    
</script>

<svelte:head>
    <title>{CONFIG.APP.NAME} | Токены</title>
</svelte:head>

<SectionContainer>
    <Tokens bind:items={$allTokens}/>
</SectionContainer>

<style lang='sass'>
    .tokens-page
        padding-top: 100px
</style>