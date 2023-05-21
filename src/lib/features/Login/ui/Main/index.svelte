<script lang='ts'>
	import { AuthLogin } from "$entities/Auth";
	import { AuthRequests } from "$shared/api/auth";
	import type { ComponentEvents } from "svelte";

	interface $$Props {
		class?:string
	}
	
	let className = ''
	export { className as class }

	const authRequests = new AuthRequests()

	const controller = {
		async login(data:Parameters<AuthRequests['login']>[0]) {
			try {
				const res = await authRequests.login(data)
				console.log({res})
			} catch (error) {
				console.error(error)
			}
		}
	}

	const handler = {
		submit(e:ComponentEvents<AuthLogin>['submit']) {
			console.log('test')
			const {fields} = e.detail
			controller.login(fields)
		}
	}
	
</script>

<AuthLogin class={`Login ${className}`} on:submit={handler.submit}/>