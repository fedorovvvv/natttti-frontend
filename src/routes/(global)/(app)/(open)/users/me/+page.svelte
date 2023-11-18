<script lang='ts'>
	import { userStore } from "$appLayer/stores/user";
	import { SectionContainer, SectionTitle } from "$shared/ui/Section";
    
</script>

<SectionContainer class='users-me-page'>
    <SectionTitle>
        <h1>Hello {$userStore.current?.username}</h1>
    </SectionTitle>
</SectionContainer>

<style lang='sass'>
    .users-me-page
</style>