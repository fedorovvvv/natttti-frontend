<script lang="ts" context="module">
	import { toasterStore } from '$shared/ui/Notification/lib';
	import type { ToastType } from '$shared/ui/Notification/types';

	// todo toast types
	// Уведомление
	// Ошибка
	// Ворнинг
	// Success
	// Прогресс с возможностью отмены

	// todo - color scheme colors

	const typeToColor: Record<ToastType, string | null> = {
		default: null,
		error: 'negative',
		progress: 'active',
		success: 'positive',
		warning: 'warning'
	};

	const {
		elements: { content, description, close },
		states: { toasts },
		actions: { portal }
	} = toasterStore;
</script>

<script lang="ts">
	import { melt } from '@melt-ui/svelte';
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';
</script>

<div use:portal class="portal">
	{#each $toasts as { id, data } (id)}
		{@const toastColor = `var(--clue-color-${typeToColor[data.type]}-500, black)`}
		<!-- using a single transition directive breaks transitions on the topmost toast, dunno why -->
		<div
			use:melt={$content(id)}
			in:fly={{ x: 50, delay: 150 }}
			out:fly={{ x: 50, delay: 150 }}
			animate:flip={{ duration: 500 }}
		>
			<button
				use:melt={$close(id)}
				class="content"
				style="color: {toastColor}; outline: 2px solid {toastColor}"
			>
				<button use:melt={$close(id)} aria-label="close notification">X</button>
				<div>
					<button
						on:click|stopPropagation={() => {
							console.log('you clicked me!');
						}}
					>
						text me
					</button>
					<div use:melt={$description(id)}>
						{data.description}
					</div>
				</div>
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
	
	.content 
		background-color: white // todo - color scheme responsive
		color: black // todo - color scheme responsive
		padding: 1rem
		border-radius: 0.75rem
		filter: drop-shadow(0 0 10px #0003)
		min-width: 16rem

</style>
