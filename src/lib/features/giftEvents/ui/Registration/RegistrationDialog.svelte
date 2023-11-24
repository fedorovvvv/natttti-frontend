<script lang='ts'>
	import type { ComponentProps } from "svelte"
	import Dialog from "$shared/ui/Dialog/ui/Dialog.svelte"

    interface $$Props {
        class?:string
        trigger?:ComponentProps<Dialog>['trigger']
    }
    
    let className = ''
    export { className as class }
    
</script>
<Dialog class={`RegistrationDialog ${className}`}>
    <svelte:fragment slot='trigger' let:trigger>
        <slot name='trigger' {trigger} />
    </svelte:fragment>
    <svelte:fragment slot='title'>
        Регистрация
    </svelte:fragment>
    
</Dialog>