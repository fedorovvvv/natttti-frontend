<script lang="ts" context="module">
	import { toasterStore } from '../lib'
	import type { ToastType } from '../types'

	const typeToColor: Record<ToastType, string | null> = {
		default: null,
		error: 'negative',
		progress: 'active',
		success: 'positive',
		warning: 'warning-600'
	}

	const {
		elements: { content, description, close },
		states: { toasts },
		actions: { portal }
	} = toasterStore
</script>

<script lang="ts">
	import { melt } from '@melt-ui/svelte'
	import type { Action } from 'svelte/action'
	import { flip } from 'svelte/animate'
	import { fly } from 'svelte/transition'
	import Progressbar from './Progressbar.svelte'

	const onDestroy: Action<HTMLElement, (() => void) | undefined> = (_, onDestroy) => {
		return {
			destroy() {
				onDestroy?.()
			}
		}
	}
</script>

<!-- @component
This is a singleton component to manage toasts - should be placed somewhere in the root layout
 -->
<div use:portal class="ToasterContainer">
	{#each $toasts as { id, data } (id)}
		{@const toastColor = `var(--clue-color-${typeToColor[data.type] ?? 'invalid'})`}
		<!-- using a single transition directive breaks transitions on the topmost toast, dunno why -->
		<div
			use:melt={$content(id)}
			use:onDestroy={data.onClose}
			in:fly={{ x: '100%' }}
			out:fly={{ x: '100%' }}
			animate:flip={{ duration: 500 }}
			class="ToasterToast"
		>
			<button use:melt={$close(id)} class="ToasterToast__wrapper" style="--color: {toastColor};">
				<div class="ToasterToast__container">
					<div class="ToasterToast__content">
						<div class="ToasterToast__icon">!</div>
						<div use:melt={$description(id)} class="ToasterToast__description">
							{data.description}
						</div>
						<button use:melt={$close(id)} aria-label="close Toaster">✖</button>
					</div>
					{#if data.action}
						{@const { label, onClick, closeOnClick } = data.action}
						<button
							class="ToasterToast__action"
							on:click={(e) => {
								if (!closeOnClick) e.stopPropagation()
								onClick()
							}}
						>
							{label}
						</button>
					{/if}
				</div>
				{#if data.type === 'progress' && data.progress !== undefined}
					<div class="ToasterToast__progress-container">
						<Progressbar value={data.progress} />
					</div>
				{/if}
			</button>
		</div>
	{/each}
</div>

<style lang="sass">
	// todo - perhaps this should be moved out as a global reset
	button
		color: inherit

	.ToasterContainer
		position: fixed
		bottom: 0
		right: 0
		z-index: 9999
		display: flex
		flex-direction: column
		align-items: end
		gap: 1rem
		padding: 1rem

	.ToasterToast
		&__wrapper
			cursor: default
			background-color: white 
			color: var(--color, black) 
			outline: 2px solid var(--color, black)
			overflow: hidden
			position: relative
			border-radius: 0.75rem
			filter: drop-shadow(0 0 10px #0003)
			min-width: 16rem
			max-width: 24rem
		&__container 
			display: flex
			flex-direction: column
			padding: 1rem
			gap: 0.5rem
		&__content
			display: flex
			align-items: start
			gap: 0.5rem
		&__icon
			display: flex
			align-items: center
			justify-content: center
			border-radius: 100%
			background-color: var(--color, black)
			color: white
			height: 1.5rem
			width: 1.5rem
		&__description
			flex: 1 0 0
			align-self: center
		&__action
			align-self: end
			padding: 0.5rem
			border-radius: 0.5rem
			background-color: var(--color, black)
			color: white
		&__progress-container
			position: absolute
			height: 0.35rem
			bottom: 0
			width: 100%
</style>
