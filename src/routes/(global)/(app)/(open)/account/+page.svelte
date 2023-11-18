<script lang='ts'>
	import { userStore } from "$appLayer/stores/user";
	import { UsersUpdate } from "$features/users";
	import { SectionContainer, SectionTitle } from "$shared/ui/Section";
    
</script>

<SectionContainer class='account-me-page'>
    <SectionTitle>
        <h1>Hello {$userStore.current?.username}</h1>
    </SectionTitle>
    <UsersUpdate/>
</SectionContainer>

<style lang='sass'>
    .account-me-page
</style>