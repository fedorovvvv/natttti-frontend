<script lang='ts'>
	import { session } from "$shared/stores/session";
	import type { LayoutData } from "./$types";
	import { EasterEggs } from "$features/EasterEggs";

    export let data:LayoutData

    session.set(data.session)
</script>

<EasterEggs/>
<slot/>