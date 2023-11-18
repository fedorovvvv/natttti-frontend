<script lang='ts'>
	import type { AuthRequests } from "$shared/api/auth";
	import { Box } from "$shared/ui/Box";
	import { Form, FormCol, FormRow } from "$shared/ui/Form";
	import Button from "@smui/button";
    import Textfield from '@smui/textfield'
	import { createEventDispatcher } from "svelte";
	import { writable } from "svelte/store";

    interface $$Props {
        class?:string
        valid?:boolean
        disabled?:boolean
    }

    interface $$Events {
        submit: CustomEvent<{
            fields: typeof $fields
        }>
    }
    
    let className = ''
    export { className as class }
    export let valid:$$Props['valid'] = false
    export let disabled:$$Props['disabled'] = false

    export const fields = writable<Parameters<AuthRequests['login']>[0]>({
        accessToken: ''
    })

    const dispatch = createEventDispatcher()

    const handler = {
        submit() {
            dispatch('submit', {
                fields: $fields
            })
        }
    }

</script>

<Box class={`AuthLogin ${className}`}>
    <Form on:submit={handler.submit}>
        <FormCol>
            <FormRow>
                <Textfield invalid={!valid} bind:value={$fields.accessToken} input$name='token' label="Код говори"/>
            </FormRow>
        </FormCol>
        <svelte:fragment slot='button'>
            <Button variant='unelevated' disabled={disabled || !$fields.accessToken}>
                Подходит?
            </Button>
        </svelte:fragment>
    </Form>
</Box>