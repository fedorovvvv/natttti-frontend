<script lang='ts'>
	import type { IToken } from "$shared/types/token";
	import { Box } from "$shared/ui/Box";
	import IconButton, { Icon } from '@smui/icon-button'
	import { CopyText } from "$shared/ui/CopyText";

	interface $$Props {
		class?:string
		tag?:string
		data:IToken
	}
	
	let className = ''
	export { className as class }
	export let tag:$$Props['tag'] = 'div'
	export let data:$$Props['data']
	
</script>

<Box {tag} size='m' class={`Token ${className}`}>
	<div class="Token__header">
		<CopyText text={data.accessToken}/>
		<div class="Token__controls">
			<IconButton size='mini'>
				<Icon class='material-icons'>
					delete
				</Icon>
			</IconButton>
		</div>
	</div>
</Box>

<style lang='sass'>
	.Token
		&__header
			display: flex
			align-items: center
		&__controls
			margin-left: auto
			display: flex
			align-items: center
			& > *
				@at-root :global &
					&:not(:last-child)
						margin-right: 10px
					.material-icons
						color: var(--gray500)
</style>