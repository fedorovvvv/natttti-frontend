<script lang="ts">
	//@ts-ignore
	import devtools from 'devtools-detect'
	import { onDestroy, onMount } from 'svelte'
	import { writable } from 'svelte/store'
	import { EasterContext } from '$entities/Easter/model'
	import { browser } from '$app/environment'

	interface $$Props {
		class?: string
	}

	let className = ''
	export { className as class }

	let mounted = false

	const easterContext = new EasterContext().set(
		writable({
			date: new Date(),
			isDevToolsOpen: false,
			isDevToolsChange: false
		})
	)

	const controller: {
		timeInterval?: ReturnType<typeof setInterval>
		startTimeInterval: VoidFunction
		stopTimeInterval: VoidFunction
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

	const handler = {
		devToolsChange(e: CustomEvent<typeof devtools>, change?: boolean) {
			if ($easterContext) {
				$easterContext.isDevToolsOpen = e.detail.isOpen
				$easterContext.isDevToolsChange = change ?? true
			}
		}
	}

	onMount(() => {
		mounted = true
		controller.startTimeInterval()
		if (browser) {
			handler.devToolsChange(
				new CustomEvent('devtoolschange', {
					detail: devtools
				}),
				false
			)
			//@ts-ignore
			window.addEventListener('devtoolschange', handler.devToolsChange)
		}
	})

	onDestroy(() => {
		controller.stopTimeInterval()
		if (browser) {
			//@ts-ignore
			window.removeEventListener('devtoolschange', handler.devToolsChange)
		}
	})
</script>

{#if !$easterContext?.isDevToolsChange && mounted}
	<slot />
{/if}
