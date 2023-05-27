<script lang='ts'>
	import { onMount } from "svelte";
	// import { EasterWhat } from "..";
    import { EasterContext } from "../model";

    interface $$Props {
        class?:string
    }
    
    let className = ''
    export { className as class }

    let voice:HTMLAudioElement | undefined
    const easterContext = new EasterContext().get()

    const handler = {
        mouseenter() {
            voice?.play()
        },
        mouseleave() {
            if (!voice) return
            voice.pause()
            voice.currentTime = 0
        },
    }

    onMount(() => {
        voice = new Audio('/voice/easter/peca.mp3')
        voice.loop = true
    })

    $: hours = $easterContext?.date.getHours()
    $: show = hours ? (hours >= 22 || hours <= 1) : false
    
</script>
{#if show}
    <div class={`EasterPeca ${className}`} on:mouseenter={handler.mouseenter} on:mouseleave={handler.mouseleave}>
        <img src='/images/easter/peca.png' alt='peca peca'/>
    </div>
{/if}

<style lang='sass'>
    .EasterPeca
        --offset: 27px
        --rotate: -20deg
        position: fixed
        z-index: 100
        bottom: 0
        right: 0
        width: 150px
        transform: translate(calc(100% - var(--offset)), calc(100% - var(--offset))) rotate(var(--rotate))
        transition: .3s ease-in-out
        transition-property: transform
        &:hover
            @media (min-width: $sm)
                --rotate: 0deg
                --offset: 80%
        img
            width: 100%
            display: block
</style>