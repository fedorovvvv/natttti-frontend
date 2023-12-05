<script lang="ts">
	interface $$Props {
		class?: string
	}

	let className = ''
	export { className as class }
</script>

<div class={`RichContent ${className}`}>
	<slot />
</div>

<style lang="sass">
    .RichContent
        :global(b)
            font-weight: 600
        :global(a)
            color: var(--clue-color-active-500)
            font-weight: 500
            transition: .3s ease-in-out
            transition-property: color
            &:hover
                color: var(--clue-color-active-600)
        :global(ul)
            list-style: disc
        :global(ol)
            list-style: decimal
        :global(ul), :global(ol)
            padding-left: 30px
        :global(li)
            &:not(:last-child)
                margin-bottom: 6px
</style>
