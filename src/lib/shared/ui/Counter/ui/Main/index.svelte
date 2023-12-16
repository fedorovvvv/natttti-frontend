<script lang="ts">
	import { fly } from 'svelte/transition'
	interface $$Props {
		class?: string
		value: number
		theme?: 'green' | 'blue'
		label?: string
	}

	let className = ''
	export { className as class }
	export let value: $$Props['value'] = 0
	export let theme: $$Props['theme'] = undefined
	export let label: $$Props['label'] = undefined
</script>

<div class={`Counter ${className} ${theme ? `Counter_theme-${theme}` : ''}`}>
	{#if label}
		<span class="Counter__label">{label}</span>
	{/if}
	<div class="Counter__value" data-value={value.toString().replace(/[0-9]/g, '0')}>
		{#key value}
			<span
				in:fly={{
					y: 40,
					duration: 500,
					opacity: 1
				}}
				out:fly={{
					y: -40,
					duration: 500,
					opacity: 1
				}}>{value}</span
			>
		{/key}
	</div>
</div>

<style lang="sass">
	.Counter
		@at-root :global &
			border-radius: 10px
		position: relative
		text-align: center
		display: inline-block
		padding: 5px 10px
		border: 2px solid var(--clue-color-gray-10)
		color: var(--clue-color-gray-700)
		transition: .3s ease-in-out
		transition-property: color, border, background
		overflow: hidden
		font-size: 24px
		line-height: 100%
		vertical-align: middle
		&_theme
			&-green
				border-color: var(--clue-color-primary-600)
			&-blue
				border-color: var(--clue-color-active-500)
		&__label
			display: inline-block
			margin-right: 10px
			line-height: 24px
			vertical-align: middle
			margin-right: -0.02em
			margin-top: -0.03em
		&__value
			display: inline-block
			vertical-align: middle
			position: relative
			&::before
				content: attr(data-value)
				opacity: 0
				pointer-events: none
			&::before, span
				display: block
				text-align: center
				font-weight: 500
			span
				position: absolute
				top: 50%
				left: 50%
				transform: translate(-50%, -50%)
</style>
