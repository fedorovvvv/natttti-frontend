<script lang='ts'>
	import { SectionContainer } from "$shared/ui/Section";

    interface $$Props {
        class?:string
    }
    
    let className = ''
    export { className as class }
    
</script>

<main class={`account-layout ${className}`}>
    <SectionContainer>
        <h1>🐥Стланица усталела 🐥</h1>
    </SectionContainer>
</main>

<style lang='sass'>
    .account-layout
        padding-top: 100px
        h1
            text-align: center
            margin: auto
</style>