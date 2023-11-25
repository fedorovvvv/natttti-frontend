<script lang="ts">
	import Textfield from '@smui/textfield'
	import { derived, writable, type Readable, type Writable } from 'svelte/store'
	import { SocialsSchema } from '$entities/socials'
	import type { SocialsRecord } from '$shared/api/pocketbase'
	import { validateSchema } from '$shared/lib/validation'
	import { FormCol, FormRow } from '$shared/ui/Form'

	interface $$Props {
		class?: string
		fields: Writable<SocialsRecord>
	}

	let className = ''
	export { className as class }

	export let fields: $$Props['fields']
	export const isErrorVisible = writable(false)

	const schema = SocialsSchema.record

	export const validateResult = derived([fields, isErrorVisible], ([$fields, $isErrorVisible]) => {
		const res = validateSchema(schema, $fields)
		const original = { ...res }
		if (!$isErrorVisible) {
			res.isError = false
			res.errors = {}
		}
		return { ...res, original }
	})
</script>

<FormCol class={`SocialsUpdateFields ${className}`}>
	<FormRow>
		<Textfield variant="outlined" invalid={!!$validateResult.errors.telegramUsername} bind:value={$fields.telegramUsername} input$name="telegramUsername" label="Telegram username" />
	</FormRow>
	<FormRow>
		<Textfield variant="outlined" invalid={!!$validateResult.errors.gitHubUsername} bind:value={$fields.gitHubUsername} input$name="gitHubUsername" label="GitHub username" />
		<Textfield variant="outlined" invalid={!!$validateResult.errors.gitLabUsername} bind:value={$fields.gitLabUsername} input$name="gitLabUsername" label="GitLab username" />
	</FormRow>
</FormCol>
