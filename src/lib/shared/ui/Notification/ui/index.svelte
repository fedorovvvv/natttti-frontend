<script lang="ts" context="module">
	import { toasterStore } from '$shared/ui/Notification/lib';
	import type { ToastType } from '$shared/ui/Notification/types';

	const typeToColor: Record<ToastType, string | null> = {
		default: null,
		error: 'negative',
		progress: 'active',
		success: 'positive',
		warning: 'warning-600'
	};

	const {
		elements: { content, description, close },
		states: { toasts },
		actions: { portal }
	} = toasterStore;
</script>

<script lang="ts">
	import { melt } from '@melt-ui/svelte';
	import type { Action } from 'svelte/action';
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';
	import Progressbar from './Progressbar.svelte';

	const onDestroy: Action<HTMLElement, (() => void) | undefined> = (_, onDestroy) => {
		return {
			destroy() {
				onDestroy?.();
			}
		};
	};
</script>

<div use:portal class="portal">
	{#each $toasts as { id, data } (id)}
		{@const toastColor = `var(--clue-color-${typeToColor[data.type]})`}
		<!-- using a single transition directive breaks transitions on the topmost toast, dunno why -->
		<div
			use:melt={$content(id)}
			use:onDestroy={data.onClose}
			in:fly={{ x: '100%' }}
			out:fly={{ x: '100%' }}
			animate:flip={{ duration: 500 }}
		>
			<button use:melt={$close(id)} class="outer-container" style="--color: {toastColor};">
				<div class="container">
					<div class="content">
						<div class="icon">!</div>
						<div use:melt={$description(id)} class="description">
							{data.description}
						</div>
						<button use:melt={$close(id)} aria-label="close notification">✖</button>
					</div>
					{#if data.action}
						{@const { label, onClick, closeOnClick } = data.action}
						<button
							class="action"
							on:click={(e) => {
								if (!closeOnClick) e.stopPropagation();
								onClick();
							}}
						>
							{label}
						</button>
					{/if}
				</div>
				{#if data.type === 'progress' && data.progress !== undefined}
					<div class="progress">
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

	.portal 
		position: fixed
		bottom: 0
		right: 0
		z-index: 9999
		display: flex
		flex-direction: column
		align-items: end
		gap: 1rem
		padding: 1rem
	
	.outer-container
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

	.container 
		display: flex
		flex-direction: column
		padding: 1rem
		gap: 0.5rem

	.content
		display: flex
		align-items: start
		gap: 0.5rem

	.icon
		display: flex
		align-items: center
		justify-content: center
		border-radius: 100%
		background-color: var(--color, black)
		color: white
		height: 1.5rem
		width: 1.5rem

	.description
		flex: 1 0 0
		align-self: center

	.action
		align-self: end
		padding: 0.5rem
		border-radius: 0.5rem
		background-color: var(--color, black)
		color: white

	.progress
		position: absolute
		height: 0.35rem
		bottom: 0
		width: 100%
</style>
