<script lang='ts'>
    import Button from "@smui/button"
	import { createMutation } from "@tanstack/svelte-query"
	import type { ComponentEvents, ComponentProps } from "svelte"
	import { writable } from "svelte/store"
	import type { AddressesRecord, AddressesResponse } from "$shared/api/pocketbase"
	import { Form } from "$shared/ui/Form"
	import { AddressesSchema } from "../model"
	import AddressesFields from "./AddressesFields.svelte"
	import { applyAction, deserialize } from "$app/forms"

    interface $$Props {
        class?:string
        action?:string
        initialData?:AddressesRecord | null
    }
    
    let className = ''
    export { className as class }

    export let action:$$Props['action'] = '/addresses?/createOrUpdate'
    export let initialData:$$Props['initialData'] = undefined

    const fields = writable(initialData ?? AddressesSchema.fields.getDefault())
        
    let validate:ComponentProps<AddressesFields>['validate']

    const mutation = createMutation({
        mutationFn: async (form:HTMLFormElement) => {
            if ($validate?.original.isError) return

            const response = await fetch(form.action, {
				method: 'POST',
				body: new FormData(form)
			})

			const result = deserialize<
				{
					address: AddressesResponse
				},
				undefined
			>(await response.text())

			await applyAction(result)

			if (result.type === 'success' && result.data) {
				return result.data
			} else {
				throw Error('Error update')
			}
        }
    })

    const handler = {
        submit(event:ComponentEvents<Form>['submit']) {
            event.preventDefault()
            validate?.show()
            $mutation.mutate(event.currentTarget as HTMLFormElement)
        } 
    }
    
</script>

<Form {action} class={`AddressesForm ${className}`} on:submit={handler.submit}>
    <AddressesFields
        bind:validate
        {fields}
    />
    <svelte:fragment slot='button'>
        <Button
            variant='unelevated'
            disabled={$mutation.isPending || $validate?.isError}
        >
            {#if $mutation.isPending}
                Сохранение...
            {:else}
                Сохранить
            {/if}
        </Button>
    </svelte:fragment>
</Form>

<style lang='sass'>
    .AddressesForm
</style>