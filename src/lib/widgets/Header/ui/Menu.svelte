<script lang='ts'>
	import { page } from "$app/stores";

    interface $$Props {
        class?:string
    }
    
    let className = ''
    export { className as class }
    $: items = [
        // ...($session.accessToken ? [
        //     {
        //         id: 'tokens',
        //         href: '/tokens',
        //         text: 'Токены',
        //     }
        // ] : [])
    ]
</script>

{#if items.length}
    <nav class={`HeaderMenu ${className}`}>
        {#each items as item (item.id)}
            <a  
                href={item.href}
                class='HeaderMenu__item'
                class:HeaderMenu__item_active={$page.url.pathname.startsWith(item.href)}
            >{item.text}</a>
        {/each}
    </nav>    
{/if}

<style lang='sass'>
    .HeaderMenu
        &__item
            font-weight: 600
            position: relative
            &:hover
                @media (min-width: $sm)
                    &::after
                        width: calc(100% + 6px)
            &::after
                content: ''
                display: block
                position: absolute
                z-index: -1
                width: 0
                height: 2px
                bottom: 0px
                left: -3px
                background: var(--green500)
                transition: .1s ease-in-out
                transition-property: width, height
            &_active
                &::after
                    width: calc(100% + 6px)
                    height: 5px            
</style>