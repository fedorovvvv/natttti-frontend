<script lang='ts'>
	import { Token } from "$entities/Token";
	import { TokenAccessTypes } from "$shared/types/token";
	import { SectionContainer } from "$shared/ui/Section";

    interface $$Props {
        class?:string
    }
    
    let className = ''
    export { className as class }
    
</script>

<main class={`tokens-page ${className}`}>
    <SectionContainer>
        <Token data={{
            id: 0,
            issuedAt: new Date().toString(),
            expiresAt: new Date().toString(),
            grantedTo: new Date().toString(),
            accessToken: 'qwertyuiopasdfghjklzxcvbnm,',
            accessType: TokenAccessTypes.Admin,

        }}/>
    </SectionContainer>
</main>

<style lang='sass'>
    .tokens-page
</style>