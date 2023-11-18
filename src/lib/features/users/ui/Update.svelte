<script lang='ts'>
	import { userStore } from "$appLayer/stores/user";
	import { createUserSchema } from "$entities/users/model/schema";
	import { validateSchema } from "$shared/lib/validation";
	import { Box } from "$shared/ui/Box";
	import { Form, FormCol, FormRow } from "$shared/ui/Form";
	import Button from "@smui/button";
    import type { ComponentEvents } from "svelte";
	import Textfield from "@smui/textfield";
	import type { ActionResult } from "@sveltejs/kit";
	import { derived, writable } from "svelte/store";
	import { applyAction, deserialize, enhance } from "$app/forms";
	import { usersLogoutEnhance, type UserRecord } from "$entities/users";

    interface $$Props {
        class?:string
    }
    
    let className = ''
    export { className as class }

    const updateResult = writable<ActionResult<UserRecord> | undefined>(undefined)
    const isErrorVisible = writable(false)
    const userSchema = createUserSchema()
    
    const fields = writable(userStore.clone())
    
    const userSchemaResult = derived([fields, isErrorVisible], ([$fields, $isErrorVisible]) => {
        const res = validateSchema(userSchema, $fields)
        if (!$isErrorVisible) {
            res.isError = false
            res.errors = {}
        }
        return res
    })

    const handler = {
        async submit(event:ComponentEvents<Form>['submit']) {
            event.preventDefault()
            isErrorVisible.set(true)
            if ($userSchemaResult.isError) return

            const form = event.currentTarget as HTMLFormElement
            
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
            })

            const result = deserialize<UserRecord, undefined>(await response.text())

            updateResult.set(result)

            if (result.type === 'success') {
                userStore.set(result.data)
            }
            await applyAction(result)
        }
    }

</script>

<Box class={`UsersUpdate ${className}`}>
    <Form method='POST' action={`/users/update/${$userStore.current?.id}`} on:submit={handler.submit}>
        <FormCol>
            <FormRow>
                <Textfield invalid={!!$userSchemaResult.errors.username} bind:value={$fields.username} required input$name='username' variant='outlined' type='text' label="Username"/>
            </FormRow>
            <FormRow>
                <Textfield invalid={!!$userSchemaResult.errors.firstName} bind:value={$fields.firstName} required input$name='firstName' variant='outlined' type='text' label="Имя"/>
                <Textfield invalid={!!$userSchemaResult.errors.lastName} bind:value={$fields.lastName} required input$name='lastName' variant='outlined' type='text' label="Фамилия"/>
            </FormRow>
            <FormRow>
                <Textfield invalid={!!$userSchemaResult.errors.email} bind:value={$fields.email} disabled input$name='email' variant='outlined' type='email' label="Email"/>
            </FormRow>
            <FormRow>
                <Textfield invalid={!!$userSchemaResult.errors.gitHubUrl} bind:value={$fields.gitHubUrl} input$name='gitHubUrl' variant='outlined' type='url' label="GitHub link"/>
            </FormRow>
        </FormCol>
        <svelte:fragment slot='button'>
            <Button variant='unelevated'>
                {#if $updateResult?.type === 'failure'}
                    Упс, чет не то
                {:else}
                    Обновить
                {/if}
            </Button>
            <form method='POST' use:enhance={usersLogoutEnhance} action="/users/logout">
                <Button variant='outlined'>
                    Выйти
                </Button>
            </form>
        </svelte:fragment>
    </Form>
</Box>

<style lang='sass'>
    .UsersUpdate
</style>