<script lang='ts'>
	import { Easter, EasterPeca } from "$entities/Easter";

	interface $$Props {
		class?:string
	}
	
	let className = ''
	export { className as class }
	
</script>

<Easter class={`EasterEggs ${className}`}>
	<EasterPeca/>
</Easter>

<style lang='sass'>
	.EasterEggs
</style>