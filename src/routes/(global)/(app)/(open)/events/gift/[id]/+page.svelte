<script lang='ts'>
	import { dev } from "$app/environment";
	import { GiftEventsCard } from "$entities/giftEvents/index.js";
	import { SectionContainer, SectionTitle } from "$shared/ui/Section";

    export let data

</script>

<SectionContainer>
    <SectionTitle>
        {#if dev}
            <GiftEventsCard data={data.post}/>
        {:else}
            <h1>Скоро будет🎅🏻</h1>
        {/if}
    </SectionTitle>
</SectionContainer>