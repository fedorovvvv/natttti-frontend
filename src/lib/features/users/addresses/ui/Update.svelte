<script lang='ts'>
    import { createQuery } from "@tanstack/svelte-query"
	import { AddressesForm } from "$entities/addresses"
	import { UsersQueries } from "$entities/users"
	import type { AddressesResponse } from "$shared/api/pocketbase"
	import { Box } from "$shared/ui/Box"


    interface $$Props {
        class?:string
        userId:string
        initialData?:AddressesResponse | null
    }
    
    let className = ''
    export { className as class }

    export let userId:$$Props['userId']
    export let initialData:$$Props['initialData'] = undefined

    const query = createQuery({
        queryKey: UsersQueries.getAddress.createKey(userId),
        queryFn: async (...data) => UsersQueries.getAddress.queryFn(...data),
        initialData: initialData as Exclude<typeof initialData, undefined>
    })
    
</script>

<Box>
    {#if $query.status === 'success'}
        <AddressesForm class={`FeatureUsersAddressesUpdate ${className}`} initialData={$query.data} action={`/users/addresses/${userId}?/createOrUpdate`}/>
    {/if}
</Box>