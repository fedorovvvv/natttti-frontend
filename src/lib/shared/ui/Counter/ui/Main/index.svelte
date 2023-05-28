<script lang='ts'>
	import {tweened} from 'svelte/motion'
	import {expoInOut} from 'svelte/easing'
	import { fly } from 'svelte/transition';
	interface $$Props {
		class?:string
		value:number
		theme?:'green' | 'blue'
	}
	
	let className = ''
	export { className as class }
	export let value:$$Props['value'] = 0
	export let theme:$$Props['theme'] = undefined

	const tweenedValue = tweened(0, {
		duration: 300,
		easing: expoInOut
	})

	$: tweenedValue.set(value)
	$: fixedValue = $tweenedValue.toFixed(0)
</script>

<div class={`Counter ${className} ${theme ? `Counter_theme-${theme}` : ''}`} >
	<span class='Counter__pseudo'>{value.toString().replace(/[0-9]/g, '0')}</span>
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
			class='Counter__value'
		>
			{fixedValue}
		</span>
	{/key}
</div>

<style lang='sass'>
	.Counter
		@at-root :global &
			border-radius: 10px
		position: relative
		display: flex
		align-items: center
		justify-content: center
		text-align: center
		padding: 5px 10px
		border: 2px solid var(--gray50)
		color: var(--gray600)
		transition: .3s ease-in-out
		transition-property: color, border, background
		overflow: hidden
		&_theme
			&-green
				border-color: var(--green600)
			&-blue
				border-color: var(--blue500)
		span
			display: block
			font-size: 24px
			text-align: center
			font-weight: 500
		&__pseudo
				opacity: 0
				pointer-events: none
		&__value
			position: absolute
			top: 50%
			left: 50%
			transform: translate(-50%, -50%)
</style>