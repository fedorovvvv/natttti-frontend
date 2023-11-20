<script lang="ts">
	import { readable } from 'svelte/store';
	import { isSvelteStore } from '$shared/lib/Store';
	import type { MaybeStore } from '$shared/types/Store';

	export let value: MaybeStore<number>

	$: progress = isSvelteStore(value) ? value : readable(value);
</script>

<div class="ToasterProgressbar" style="--progress: {$progress}%" />

<style lang="sass">
   .ToasterProgressbar
        background-color: var(--color, black)
        height: 100%
        width: 100%
        transform: scaleX(var(--progress, 0%))
        transform-origin: left
        transition: transform 200ms linear
</style>
