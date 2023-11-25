<script lang="ts">
	import { onMount } from 'svelte'
	import { GitRequests } from '$shared/api/Git'
	import { LoadText } from '$shared/ui/Load'

	interface $$Props {
		class?: string
	}

	let className = ''
	export { className as class }

	let mounted = false

	const gitRequests = new GitRequests()

	let awaitedData: Awaited<ReturnType<(typeof gitRequests)['getContributors']>> | undefined = undefined

	onMount(() => {
		mounted = true
		gitRequests.getContributors().then((res) => {
			awaitedData = res
		})
	})
</script>

<div class={`Contributors ${className}`}>
	<h2>💅 Рабочая сила</h2>
	{#if mounted}
		{#if awaitedData}
			<ul class="Contributors__list">
				{#each awaitedData as user (user.id)}
					<li class="Contributors__item">
						<a href={user.html_url} target="_blank" rel="noreferrer">
							<img src={user.avatar_url} alt={user.name} />
						</a>
					</li>
				{/each}
			</ul>
		{:else}
			<LoadText class="Contributors__loader">Поиск в архивах...</LoadText>
		{/if}
	{/if}
</div>

<style lang="sass">
	.Contributors
		--size: 60px
		text-align: center
		&__loader
			@at-root :global &
				display: block
				margin-top: 40px
		&__list
			display: grid
			grid-template-columns: repeat(auto-fit, var(--size))
			justify-content: center
			margin: 40px auto 0
			gap: 20px
		&__item
			border-radius: 50%
			overflow: hidden
			transform: translateZ(0)
			a
				display: block
				cursor: pointer
				filter: grayscale(50%)
				transition: .3s ease-in-out
				transition-property: filter
				&:hover
					@media (min-width: $sm)
						filter: none
			img
				width: var(--size)
				height: var(--size)
</style>
