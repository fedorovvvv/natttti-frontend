<script lang="ts">
	interface $$Props {
		class?: string
	}

	let className = ''
	export { className as class }

	const repeat = {
		t: [
			{
				color: 'var(--color-nattti-1)'
			},
			{
				color: 'var(--color-nattti-4)'
			},
			{
				color: 'var(--color-nattti-2)'
			},
			{
				color: 'var(--color-nattti-3)'
			}
		]
	}
</script>

<a href="/" class={`Logo ${className}`}>
	na{#each repeat.t as { color }, i}<span style:--color={color} style:transition-delay={`${i * 50}ms`}>t</span>{/each}i<i class="Logo__dot">.</i>
</a>

<style lang="sass">
	.Logo
		$root: &
		&:not(:hover)
			& > *
				@at-root :global &
					color: inherit
		&:hover
			span
				color: var(--color)
		span
			transition: .3s ease-in-out
			transition-property: color
		&__dot
			font-style: normal
			position: relative
			color: var(--clue-color-active-400)
			transition: .3s ease-in-out
			transition-property: color
			&::before, &::after
				content: '.'
				display: block
				position: absolute
				left: 0
				top: 0
				transition: .3s ease-in-out
				transition-property: transform, color
			&::before
				color: var(--clue-color-primary-400)
			&::after
				color: var(--clue-color-active-600)
			@at-root #{$root}:hover &
				&::before
					transform: translateX(30%)
				&::after
					transform: translateX(60%)
</style>
