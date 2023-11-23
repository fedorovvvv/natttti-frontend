<script lang="ts">
	import type { MaybeStore } from '$shared/types/Store'
	import StoreValue from './StoreValue.svelte'
	import { isSvelteStore } from '.'

	export let value: MaybeStore<unknown>
</script>

<!--
  @component
  A helper to display a maybe store value and subscribe to it if it is a store.

  Useful if your maybe store value is a property on an object and only accessible conditionally.
  
  Here's an example which would require much more boilerplate and unnecessary code w/o this component.
  ```svelte
  <script lang="ts">
    import type { Readable } from 'svelte/store';
    import type { MaybeStore } from '$shared/types/Store';
    import { isSvelteStore } from '$shared/lib/Store';
    import MaybeStoreValue from '$shared/lib/Store/MaybeStoreValue.svelte';


    type Value = { type: 'a'; a: string } | { type: 'b'; b?: MaybeStore<string> };
    export let value: Value;
</script>

{#if value.type === 'b'}
    <MaybeStoreValue value={value.b} />
{/if}
```
-->
{#if isSvelteStore(value)}
	<StoreValue store={value} />
{:else}
	{value}
{/if}
