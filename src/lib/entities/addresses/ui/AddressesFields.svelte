<script lang="ts">
	import Textfield from '@smui/textfield'
	import { writable, type Readable, type Writable } from 'svelte/store'
	import type { AddressesRecord } from '$shared/api/pocketbase'
	import { createValidateSchemaStore } from '$shared/lib/validation'
	import { FormCol, FormRow } from '$shared/ui/Form'
	import { AddressesSchema } from '../model'

	interface $$Props {
		class?: string
		fields?: Readable<AddressesRecord>
	}

	let className = ''
	export { className as class }

	export const schema = AddressesSchema.fields

	export let fields: Exclude<$$Props['fields'], undefined> = writable(schema.getDefault())

	export const validate = createValidateSchemaStore(schema, fields)
</script>

<FormCol class={`AddressesFields ${className}`}>
	<FormRow>
		<Textfield invalid={!!$validate.errors.name} bind:value={$fields.name} variant="outlined" input$name="name" label="Название адреса" />
	</FormRow>
	<FormRow>
		<Textfield invalid={!!$validate.errors.country} bind:value={$fields.country} variant="outlined" input$name="country" label="Страна" />
		<Textfield invalid={!!$validate.errors.city} bind:value={$fields.city} variant="outlined" input$name="city" label="Город" />
	</FormRow>
</FormCol>
