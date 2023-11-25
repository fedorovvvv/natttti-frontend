<script lang='ts'>
	import Textfield from "@smui/textfield"
	import { writable } from "svelte/store"
	import { GiftEventsSchema } from "$entities/giftEvents"
	import { createValidateSchemaStore } from "$shared/lib/validation"
	import { FormCol, FormRow } from "$shared/ui/Form"

    interface $$Props {
        class?:string
    }
    
    let className = ''
    export { className as class }

    const schema = GiftEventsSchema.registration

    const fields = writable(schema.getDefault())

    export const schemaResult = createValidateSchemaStore(schema, fields)
</script>

<FormCol class={`RegistrationFields ${className}`}>
    <FormRow>
        <Textfield
            invalid={!!$schemaResult.errors.description}
            textarea
            input$rows={10}
            bind:value={$fields.description}
            input$name='description'
            variant='outlined'
            label='Я увлекаюсь ... и мне нравятся...'
        />
    </FormRow>
</FormCol>