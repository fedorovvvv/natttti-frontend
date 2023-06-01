<script lang='ts'>
	import { GitRequests } from "$shared/api/Git";
	import { LoadText } from "$shared/ui/Load";
	import { onMount } from "svelte";

	interface $$Props {
		class?:string
	}
	
	let className = ''
	export { className as class }

	let mounted = false

	const gitRequests = new GitRequests()

	onMount(() => {
		mounted = true
	})
</script>

<div class={`Contributors ${className}`}>
	<h2>💅 Рабочая сила</h2>
	{#if mounted}
		{#await gitRequests.getContributors()}
			<LoadText class='Contributors__loader'>Поиск в архивах...</LoadText>
		{:then res}
			<ul class='Contributors__list'>
				{#each res as user (user.id)}
					<li class='Contributors__item'>
						<a href={user.html_url} target="_blank" rel='noreferrer'>
							<img src={user.avatar_url} alt={user.name}/>
						</a>
					</li>
				{/each}
			</ul>
		{/await}
	{/if}
</div>

<style lang='sass'>
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
			max-width: 800px
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