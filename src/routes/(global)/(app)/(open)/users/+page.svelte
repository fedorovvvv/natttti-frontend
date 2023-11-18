<script lang='ts'>
	import { pb } from "$shared/api/pocketbase";
	import { CustomQuery } from "$shared/api/CustomQuery";
	import { createQuery } from "@tanstack/svelte-query";
	import { derived } from "svelte/store";
	import { getProjectsCollection } from "$entities/projects/api";

    const users = createQuery({
        queryKey: ['user', {test:''}],
        queryFn: async (data) => {
            return getProjectsCollection().getFullList()
        },
    })
    
</script>

<h2>USERS</h2>
{#if $users.isSuccess}
    <ul>
        {#each $users.data as user}
            <li>
                {JSON.stringify(user)}
            </li>
        {/each}
    </ul>
{/if}