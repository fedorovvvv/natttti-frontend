<script lang='ts'>
	import { applyAction, deserialize } from "$app/forms";
	import { validateSchema } from "$shared/lib/validation";
	import { Box } from "$shared/ui/Box";
	import { Form, FormCol, FormRow } from "$shared/ui/Form";
	import Button from "@smui/button";
	import Textfield from "@smui/textfield";
	import type { ComponentEvents } from "svelte";
	import { derived, writable } from "svelte/store";
	import type { ActionResult } from "@sveltejs/kit";
	import Link from "$shared/ui/Link/Link.svelte";
	import { createUserSchema } from "$entities/users/model/schema";
	import { UsersOAuth2GitHub, UsersOAuth2List } from "$features/users/OAuth2";

    interface $$Props {
        class?:string
    }
    
    let className = ''
    export { className as class }
    let isErrorVisible = writable(false)
    let loginResult = writable<ActionResult | undefined>(undefined)

    const userSchema = createUserSchema()

    const fields = writable(userSchema.getDefault())

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

            const result = deserialize(await response.text())
            loginResult.set(result)
            await applyAction(result)
        }
    }
    
</script>
<Box class={`UsersAuthRegistration ${className}`}>
    <Form method='POST' action='/users/reg' on:submit={handler.submit}>
        <UsersOAuth2List slot='header'>
            <UsersOAuth2GitHub/>
        </UsersOAuth2List>
        <FormCol>
            <FormRow>
                <Textfield invalid={!!$userSchemaResult.errors.username} bind:value={$fields.username} required input$name='username' variant='outlined' type='text' label="Username"/>
            </FormRow>
            <FormRow>
                <Textfield invalid={!!$userSchemaResult.errors.firstName} bind:value={$fields.firstName} required input$name='firstName' variant='outlined' type='text' label="Имя"/>
                <Textfield invalid={!!$userSchemaResult.errors.lastName} bind:value={$fields.lastName} required input$name='lastName' variant='outlined' type='text' label="Фамилия"/>
            </FormRow>
            <FormRow>
                <Textfield invalid={!!$userSchemaResult.errors.password} bind:value={$fields.password} required input$name='password' variant='outlined' type='password' label="Пароль"/>
            </FormRow>
            <FormRow>
                <Textfield invalid={!!$userSchemaResult.errors.passwordConfirm} bind:value={$fields.passwordConfirm} required input$name='passwordConfirm' variant='outlined' type='password' label="Пароль точно такой?"/>
            </FormRow>
        </FormCol>
        <svelte:fragment slot='button'>
            <Button variant='unelevated' disabled={$userSchemaResult.isError}>
                {#if $loginResult?.type === 'failure'}
                    Упс, чет не то
                {:else}
                    Записаться
                {/if}
            </Button>
        </svelte:fragment>
        <Link href="/users/login" slot='links'>Вход</Link>
    </Form>
</Box>