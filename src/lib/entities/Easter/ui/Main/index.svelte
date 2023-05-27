<script lang='ts'>
	import { setContext } from "svelte";
	import { writable } from "svelte/store";
	import { onDestroy, onMount } from "svelte";
	import { EasterContext } from "$entities/Easter/model";

	interface $$Props {
		class?:string
	}
	
	let className = ''
	export { className as class }
	const easterContext = new EasterContext().set(writable({
		date: new Date()
	}))


	const controller:{
		timeInterval?:ReturnType<typeof setInterval>
		startTimeInterval:VoidFunction
		stopTimeInterval:VoidFunction
	} = {
		timeInterval: undefined,
		startTimeInterval() {
			this.stopTimeInterval()
			this.timeInterval = setInterval(() => {
				$easterContext && ($easterContext.date = new Date())
			}, 1000)
		},
		stopTimeInterval() {
			clearInterval(this.timeInterval)
		}
	}
	
	onMount(() => {
		controller.startTimeInterval()
	})

	onDestroy(() => {
		controller.stopTimeInterval()
	})
	
</script>

<div class={`Easter ${className}`}>
	<slot/>
</div>

<style lang='sass'>
	.Easter
</style>