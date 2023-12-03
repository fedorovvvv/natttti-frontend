<script lang="ts">
	import { createQuery, useQueryClient } from '@tanstack/svelte-query'
	import type { ComponentEvents } from 'svelte'
	import { AddressesForm } from '$entities/addresses'
	import { UsersQueries } from '$entities/users'
	import type { AddressesResponse } from '$shared/api/pocketbase'
	import { Box } from '$shared/ui/Box'

	interface $$Props {
		class?: string
		userId: string
		initialData?: AddressesResponse | null
	}

	let className = ''
	export { className as class }

	export let userId: $$Props['userId']
	export let initialData: $$Props['initialData'] = undefined

	const queryKey = UsersQueries.getAddress.createKey(userId)

	const client = useQueryClient()

	const query = createQuery({
		queryKey,
		queryFn: async (...data) => UsersQueries.getAddress.queryFn(...data),
		initialData: initialData as Exclude<typeof initialData, undefined>
	})

	const handler = {
		success(e: ComponentEvents<AddressesForm>['success']) {
			client.setQueryData(queryKey, e.detail.address)
		}
	}
</script>

<Box>
	{#if $query.status === 'success'}
		<AddressesForm class={`FeatureUsersAddressesUpdate ${className}`} initialData={$query.data} on:success={handler.success} action={`/users/addresses/${userId}?/createOrUpdate`} />
	{/if}
</Box>
