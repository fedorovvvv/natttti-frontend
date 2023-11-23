<script lang="ts">
	import Button from '@smui/button'
	import { page } from '$app/stores'

	interface $$Props {
		class?: string
		name: string
		href: string
	}

	let className = ''
	export { className as class }
	export let href: $$Props['href']
	export let name: $$Props['name']

	$: isActive = $page.url.pathname.startsWith(href)
</script>

<Button variant={isActive ? 'unelevated' : 'text'} class={`AccountNavItem ${className}`} {href}>
	{name}
</Button>
