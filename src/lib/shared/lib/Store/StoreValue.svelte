<script lang="ts">
	import type { Readable } from 'svelte/store';
	export let store: Readable<unknown>;
</script>

<!--
  @component
  A helper to display a store value and subscribe to it.

  Useful if your store value is a property on an object and only accessible conditionally.
  
  Here's an example which would require much more boilerplate and unnecessary code w/o this component.
  ```svelte
  <script lang="ts">
	import type { Readable } from 'svelte/store';
    import type { MaybeStore } from '$shared/types/Store';
	import { isSvelteStore } from '$shared/lib/Store';
	import StoreValue from './StoreValue.svelte';

	type Value = { type: 'a'; a: string } | { type: 'b'; b?: MaybeStore<string> };
	export let value: Value;
</script>

{#if value.type === 'b' && isSvelteStore(value.b)}
	<StoreValue store={value.b} />
{/if}
```
-->

{$store}
