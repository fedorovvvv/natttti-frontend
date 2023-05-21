<script lang='ts'>
	import { session } from "$shared/stores/session";
	import type { LayoutData } from "./$types";

    export let data:LayoutData

    session.set(data.session)
</script>

<slot/>