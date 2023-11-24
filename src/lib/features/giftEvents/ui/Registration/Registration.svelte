<script lang='ts'>
    import { melt } from "@melt-ui/svelte"
    import Button from "@smui/button"
	import type { ComponentProps } from "svelte"
	import RegistrationDialog from "./RegistrationDialog.svelte"

    interface $$Props extends ComponentProps<Button> {
        class?:string
    }
    
    let className = ''
    export { className as class }

</script>

<RegistrationDialog>
    <svelte:fragment slot='trigger' let:trigger>
        <Button class={`GiftEventsRegistration ${className}`} use={[trigger.action]} {...$$restProps}>
            <slot>
                Регистрация
            </slot>
        </Button>
    </svelte:fragment>
</RegistrationDialog>