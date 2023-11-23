<script lang="ts">
	import { createEventDispatcher, type ComponentEvents } from 'svelte'
	import { writable } from 'svelte/store'
	import { AuthRequests } from '$shared/api/auth'
	import { Auth } from '$shared/lib/Auth'

	interface $$Props {
		class?: string
		valid?: boolean
	}

	interface $$Events {
		ok: CustomEvent
	}

	let className = ''
	export { className as class }

	export let valid: $$Props['valid'] = true

	const state = writable({
		fetching: false
	})

	const authRequests = new AuthRequests()

	const dispatch = createEventDispatcher()

	const speak = {
		create(text: string) {
			const speech = new SpeechSynthesisUtterance(text)
			speech.pitch = 2
			speech.lang = 'ru'
			speech.volume = 1
			speech.rate = 0.76
			return speech
		},
		error() {
			window.speechSynthesis.speak(this.create('А НУ ГОВОРИ!!!!'))
		}
	}

	const controller = {
		async login(data: Parameters<AuthRequests['login']>[0]) {
			if ($state.fetching) return
			$state.fetching = true

			try {
				const res = await authRequests.login(data)

				if (res._error) {
					throw new Error(res.title)
				}

				valid = true

				Auth.login(data)

				dispatch('ok')
			} catch (error) {
				valid = false
				speak.error()
				console.error(error)
			} finally {
				$state.fetching = false
			}
		}
	}

	// const handler = {
	// 	submit(e: ComponentEvents<AuthLogin>['submit']) {
	// 		const { fields } = e.detail
	// 		controller.login(fields)
	// 	}
	// }
</script>

<!-- <AuthLogin disabled={$state.fetching} {valid} class={`Login ${className}`} on:submit={handler.submit}/> -->
