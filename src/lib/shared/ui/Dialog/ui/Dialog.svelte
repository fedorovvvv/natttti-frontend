<script lang='ts'>
    import { createDialog, melt } from "@melt-ui/svelte"
	import Button from "@smui/button"
	import { fade, fly } from "svelte/transition"
	import { CONFIG } from "$shared/config"

    interface $$Props extends Exclude<Parameters<typeof createDialog>[0], undefined> {
        class?:string
    }
    
    let className = ''
    export { className as class }

    const {
        elements: {
            trigger:_trigger,
            overlay,
            content,
            title,
            description,
            close,
            portalled,
        },
        states: { open: _open },
    } = createDialog({
        forceVisible: true,
        ...$$restProps,
    })
    export const trigger = _trigger
    export const open = _open

    let scrolled = false
    
    const handler = {
        scroll(e:Event) {
            const element = e.currentTarget as HTMLElement
            const {scrollTop} = element
            scrolled = scrollTop > 20
        }
    }

</script>

<slot name='trigger' trigger={$trigger}/>

<div class={`Dialog ${className}`} use:melt={$portalled}>
    {#if $open}
        <div
            use:melt={$overlay}
            class='Dialog__overlay'
            transition:fade={CONFIG.TRANSITION}
        />
        <div
            class="Dialog__scroll"
            on:scroll={handler.scroll}
            use:melt={$content}
            in:fly={{
                ...CONFIG.TRANSITION,
                y: -50,
                opacity: 0,
            }}
            out:fly={{
                ...CONFIG.TRANSITION,
                y: 50,
                opacity: 0,
            }}
        >
            <div
                class='Dialog__content'
            >
                <div class="Dialog__header" class:Dialog__header_floated={scrolled}>
                    {#if $$slots.title}
                        <h2 use:melt={$title}><slot name='title'/></h2>
                    {/if}
                    <Button class='Dialog__close' use={[$close.action]}>уйти</Button>
                </div>
                <div class="Dialog__main">
                    {#if $$slots.description}
                        <p use:melt={$description} class='Dialog__description'><slot name='description'/></p>
                    {/if}
                    <slot/>
                </div>
            </div>
        </div>
    {/if}
</div>

<style lang='sass'>
    .Dialog
        --dialog-padding-x: var(--containerPadding)
        --dialog-padding-y: 16px
        --dialog-scroll-padding: 20px
        --dialog-border-radius: 20px
        position: fixed
        z-index: 1000
        isolation: isolate
        &__overlay
            position: fixed
            top: 0
            left: 0
            right: 0
            bottom: 0
            background: hsla(var(--clue-color-primary-990-hsl), .2)
            backdrop-filter: blur(1px)
            z-index: -1
        &__scroll
            position: fixed
            top: 0
            left: 0
            right: 0
            bottom: 0
            overflow: auto
            padding: var(--dialog-scroll-padding) 0
            display: flex
            pointer-events: none
        &__content
            display: flex
            flex-direction: column
            width: calc(100vw - 40px)
            max-width: 720px
            border-radius: var(--dialog-border-radius)
            background: #fff
            margin: auto
            pointer-events: auto
        &__header
            width: 100%
            padding: var(--dialog-padding-y) var(--dialog-padding-x)
            flex: none
            display: flex
            z-index: 2
            align-items: center
            position: sticky
            background: #fff
            top: calc(var(--dialog-scroll-padding) * -1)
            border-top-left-radius: var(--dialog-border-radius)
            border-top-right-radius: var(--dialog-border-radius)
            transition: .3s ease-in-out
            transition-property: box-shadow
            &_floated
                box-shadow: 0 2px 10px  hsla(var(--clue-color-gray-100-hsl), .5)
            h2
                font-size: 24px
                @media (max-width: 540px)
                    font-size: 20px
        &__close
            @at-root :global &
                margin-left: auto
        &__main
            padding: var(--dialog-padding-y) var(--dialog-padding-x)
            flex: 1
</style>