<script lang='ts'>
    import Button from "@smui/button"
	import type { ComponentProps } from "svelte"
	import { GiftEventsCard } from "$entities/giftEvents"

    interface $$Props extends ComponentProps<GiftEventsCard> {
        class?:string
    }
    
    let className = ''
    export { className as class }
    export let data:$$Props['data']
    
</script>

<div class={`GiftEventsCard ${className}`}>
</div>

<GiftEventsCard {data}>
    <Button variant="unelevated" slot='buttons'>Регистрация</Button>
</GiftEventsCard>

<style lang='sass'>
    .GiftEventsCard
</style>