<script lang='ts'>
	import { getProjectsCollection } from "$entities/projects/api";
	import Button from "@smui/button";
	import { createQuery } from "@tanstack/svelte-query";
	import { derived, writable } from "svelte/store";

    const test = writable(0)

    const projects = createQuery(derived([], () => {
        return {
            queryKey: ['projects'],
            queryFn: async () => {
                return getProjectsCollection().getFullList()
            },
        }
    }))
    
</script>
<h2>projects</h2>
<Button on:click={() => $test += 1}>Increment {$test}</Button>
{JSON.stringify($projects)}