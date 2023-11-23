<script lang="ts">
	// import { writable } from 'svelte/store'
	// import { Tokens } from '$features/Tokens'
	import { CONFIG } from '$shared/config'
	// import { SectionContainer } from '$shared/ui/Section'
	import type { PageData } from './$types'

	interface $$Props {
		data: PageData
	}

	// export let data

	// const allTokens = writable(data.allTokens)
	// $: allTokens.set(data.allTokens)
</script>

<svelte:head>
	<title>{CONFIG.APP.NAME} | Токены</title>
</svelte:head>

<!-- 
<SectionContainer>
	<Tokens bind:items={$allTokens} />
</SectionContainer> -->

<style lang="sass">
    // .tokens-page
    //     padding-top: 100px
</style>
