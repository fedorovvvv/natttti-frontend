<script lang="ts">
	import type { ComponentProps } from 'svelte'
	import NavItem from './NavItem.svelte'

	interface $$Props {
		class?: string
		items: Array<
			{
				id: string
			} & ComponentProps<NavItem>
		>
	}

	let className = ''
	export { className as class }

	export let items: $$Props['items'] = []
</script>

<ul class={`AccountNav ${className}`}>
	{#each items as item (item.id)}
		<li>
			<NavItem {...item} />
		</li>
	{/each}
</ul>

<style lang="sass">
    .AccountNav
        li
            width: 100%
            &:not(:last-child)
                margin-bottom: 10px
            :global(.AccountNavItem)
                width: 100%
</style>
