<script lang="ts">
	import { browser } from '$app/environment'
	import { onMount } from 'svelte'

	interface $$Props {
		class?: string
		image?: {
			src: string
		}
	}

	let className = ''
	export { className as class }
	export let image: $$Props['image'] = undefined

	let canvas: HTMLCanvasElement | undefined = undefined

	const controller = {
		drawImage() {
			if (canvas && browser && image) {
				const img = new Image()
				img.src = image.src
				img.addEventListener('load', () => {
					if (!canvas) return
					const ctx = canvas.getContext('2d')
					ctx?.drawImage(img, 0, 0, img.naturalWidth / 2, img.naturalHeight / 2)
				})
			}
		}
	}

	const handler = {
		mousemove(e: MouseEvent) {
			// console.log(e)
		}
	}

	onMount(() => {
		controller.drawImage()
	})
</script>

<svelte:window on:mousemove={handler.mousemove} />

<div class={`EasterWhat ${className}`}>
	<canvas bind:this={canvas} />
</div>

<style lang="sass">
    .EasterWhat
        display: block
        pointer-events: none
        canvas
            position: fixed
            top: 0
            left: 0
            width: 100%
            height: 100%
            pointer-events: none
</style>
