<script lang='ts'>
	import {tweened} from 'svelte/motion'
	import {expoInOut} from 'svelte/easing'
	import { fly } from 'svelte/transition';
	interface $$Props {
		class?:string
		value:number
		theme?:'green' | 'blue'
		label?:string
	}
	
	let className = ''
	export { className as class }
	export let value:$$Props['value'] = 0
	export let theme:$$Props['theme'] = undefined
	export let label:$$Props['label'] = undefined

	const tweenedValue = tweened(0, {
		duration: 300,
		easing: expoInOut
	})

	$: tweenedValue.set(value)
	$: fixedValue = $tweenedValue.toFixed(0)
</script>

<div class={`Counter ${className} ${theme ? `Counter_theme-${theme}` : ''}`}>
	{#if label}
		<span class="Counter__label">{label}</span>
	{/if}
	<div class="Counter__value" data-value={value.toString().replace(/[0-9]/g, '0')}>
		{#key fixedValue}
			<span
				in:fly|local={{
					y: 40,
					duration: 300,
				}}
				out:fly|local={{
					y: -40,
					duration: 300,
					opacity: 1
				}}
			>{fixedValue}</span>
		{/key}
	</div>
</div>

<style lang='sass'>
	.Counter
		@at-root :global &
			border-radius: 10px
		position: relative
		text-align: center
		display: inline-block
		padding: 5px 10px
		border: 2px solid var(--gray50)
		color: var(--gray600)
		transition: .3s ease-in-out
		transition-property: color, border, background
		overflow: hidden
		font-size: 24px
		line-height: 100%
		vertical-align: middle
		&_theme
			&-green
				border-color: var(--green600)
			&-blue
				border-color: var(--blue500)
		&__label
			display: inline-block
			margin-right: 10px
			line-height: 24px
			vertical-align: middle
			margin-right: -0.02em
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