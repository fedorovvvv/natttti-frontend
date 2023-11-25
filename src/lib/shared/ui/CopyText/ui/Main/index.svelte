<script lang="ts">
	import Ripple from '@smui/ripple'

	interface $$Props {
		class?: string
		tag?: string
		text: string
		hide?: 0 | 1 | 2
	}

	let className = ''
	export { className as class }
	export let tag: $$Props['tag'] = 'span'
	export let text: $$Props['text']
	export let hide: $$Props['hide'] = 1

	const controller = {
		copy() {
			navigator.clipboard.writeText(text)
		}
	}

	const hideStr = (str: string) => {
		const length = str.length
		const offset = Math.min(3, length)
		const chunk = {
			first: [0, offset],
			last: [length - offset, length]
		}
		return `${str.slice(...chunk.first)}${'*'.repeat(length - offset * 2)}${str.slice(...chunk.last)}`
	}

	const handler = {
		click() {
			controller.copy()
		}
	}

	$: hiddenText = (() => {
		switch (hide) {
			case 1:
				return hideStr(text)
			case 2:
				return '*'.repeat(text.length)
			default:
				return text
		}
	})()
</script>

<svelte:element
	this={tag}
	tabindex="0"
	role="button"
	on:click={handler.click}
	class={`CopyText ${className}`}
	use:Ripple={{
		surface: true
	}}
>
	{hiddenText}
</svelte:element>

<style lang="sass">
	.CopyText
		@at-root :global &
			display: inline-block
		padding: 5px 10px
		border-radius: 4px
		cursor: pointer
</style>
