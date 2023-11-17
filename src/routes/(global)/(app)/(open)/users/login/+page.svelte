<script lang="ts">
    import { applyAction, enhance } from '$app/forms'
	import { pb } from '$shared/api/pocketbase';
</script>

<h1>Login</h1>
<form
    method="POST"
    class="card"
    use:enhance={() => {
        return async ({ result }) => {
            pb.authStore.loadFromCookie(document.cookie)
            await applyAction(result)
        }
    }}
>
    <div class="form-control gap-2 mb-4">
        <input
            type="email"
            name="email"
            placeholder="Email"
            class="input input-bordered"
        />
        <input
            type="password"
            name="password"
            placeholder="Password"
            class="input input-bordered"
        />
        <button class="btn btn-primary">Log in</button>
    </div>
</form>