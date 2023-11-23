<script lang="ts">
	import { Login } from '$features/Login'
	import { CONFIG } from '$shared/config'
	import { SectionContainer } from '$shared/ui/Section'
	import { goto } from '$app/navigation'

	interface $$Props {
		class?: string
	}

	let className = ''
	export { className as class }

	let valid = true

	const handler = {
		ok() {
			window.location.href = '/tokens'
		}
	}
</script>

<svelte:head>
	<title>{CONFIG.APP.NAME} | Вход</title>
</svelte:head>

<SectionContainer class="account-login-page__container">
	<h2>{valid ? '🙌🏻' : '🖕🏻'} Входи</h2>
	<p>Очередь не задерживаем.</p>
	<Login on:ok={handler.ok} bind:valid />
</SectionContainer>

<style lang="sass">
    .account-login-page
        padding-top: 100px
        p
            color: var(--clue-color-gray-400)
            margin-top: 5px
        &__container
            @at-root :global &
                display: flex
                flex-direction: column
                align-items: center
                text-align: center
        .AuthLogin
            @at-root :global &
                margin-top: 20px
                width: 100%
                max-width: 300px
</style>
