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
    }

    interface $$Events {
        submit: CustomEvent<{
            fields: typeof $fields
        }>
    }
    
    let className = ''
    export { className as class }

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
                <Textfield bind:value={$fields.accessToken} name='token' label="Код говори"/>
            </FormRow>
        </FormCol>
        <svelte:fragment slot='button'>
            <Button variant='unelevated'>
                Подходит?
            </Button>
        </svelte:fragment>
    </Form>
</Box>