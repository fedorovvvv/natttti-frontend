<script lang='ts'>
	interface $$Props {
		class?:string
	}
	
	let className = ''
	export { className as class }

	const repeat = {
		t: [
			{
				color: 'var(--green500)'
			},
			{
				color: 'var(--green800)'
			},
			{
				color: 'var(--green600)'
			},
			{
				color: 'var(--green700)'
			},
		]
	}
	
</script>

<a href='/' class={`Logo ${className}`}>
	na{#each repeat.t as {color}, i}<span style:--color={color} style:transition-delay={`${i * 50}ms`}>t</span>{/each}i<span class='Logo__dot'>.</span>
</a>

<style lang='sass'>
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
			position: relative
			color: var(--blue400)
			&::before, &::after
				content: '.'
				display: block
				position: absolute
				left: 0
				top: 0
				transition: .3s ease-in-out
				transition-property: transform, color
			&::before
				color: var(--green500)
			&::after
				color: var(--blue600)
			@at-root #{$root}:hover &
				&::before
					transform: translateX(30%)
				&::after
					transform: translateX(60%)
</style>