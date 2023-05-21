<script lang='ts'>
	import { Login } from "$features/Login";
    import { SectionContainer } from "$shared/ui/Section";

    interface $$Props {
        class?:string
    }
    
    let className = ''
    export { className as class }
    
</script>

<main class={`account-login-page ${className}`}>
    <SectionContainer class='account-login-page__container'>
        <h2>Входи</h2>
        <p>Очередь не задерживаем.</p>
        <Login/>
    </SectionContainer>
</main>

<style lang='sass'>
    .account-login-page
        padding-top: 100px
        p
            color: var(--gray400)
            margin-top: 5px
        &__container
            @at-root :global &
                display: flex
                flex-direction: column
                align-items: center
                text-align: center
        .AuthLogin
            @at-root :global &
                margin-top: 20px
                width: 100%
                max-width: 300px
</style>