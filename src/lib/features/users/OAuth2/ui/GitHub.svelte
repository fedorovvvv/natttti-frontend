<script lang='ts'>
	import { applyAction, enhance } from "$app/forms";
	import { pb } from "$shared/api/pocketbase";

    interface $$Props {
        class?:string
    }
    
    let className = ''
    export { className as class }
    
</script>

<form
    use:enhance={() => {
        return async ({ result }) => {
            pb.authStore.clear()
            await applyAction(result)
        }
    }}
    method="POST"
    action='/users/login?/github'
    class={`UsersOAuth2GitHub ${className}`}
>
    <button>
        <img src="https://raw.githubusercontent.com/rdimascio/icons/master/icons/github.svg" alt='github'/>
    </button>
</form>

<style lang='sass'>
    .UsersOAuth2GitHub
        button
            width: 40px
            height: 40px
            border-radius: 6px
            border: 1px solid var(--clue-color-gray-100)
            padding: 5px
            transition: .3s ease-in-out
            transition-property: border-color
            &:hover
                border-color: var(--clue-color-gray-700)
</style>