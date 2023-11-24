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
        states: { open },
    } = createDialog({
        forceVisible: true,
        ...$$restProps,
    })
    export const trigger = _trigger
    
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
            use:melt={$content}
            class='Dialog__content'
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
            <div class="Dialog__header">
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
    {/if}
</div>

<style lang='sass'>
    .Dialog
        --dialog-padding-x: var(--containerPadding)
        --dialog-padding-y: 16px
        position: fixed
        z-index: 1000
        isolation: isolate
        display: flex
        align-items: center
        justify-content: center
        &__overlay
            position: fixed
            top: 0
            left: 0
            right: 0
            bottom: 0
            background: hsla(var(--clue-color-primary-990-hsl), .2)
            backdrop-filter: blur(1px)
            z-index: -1
        &__content
            position: fixed
            top: 50%
            left: 50%
            display: flex
            flex-direction: column
            width: calc(100vw - 40px)
            max-width: 720px
            max-height: calc(100vh - 40px)
            transform: translate(-50%, -50%)
            border-radius: 20px
            background: #fff
        &__header
            width: 100%
            padding: var(--dialog-padding-y) var(--dialog-padding-x)
            flex: none
            display: flex
            align-items: center
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