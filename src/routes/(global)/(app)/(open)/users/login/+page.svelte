<script lang="ts">
	import { UsersFeatureAuth } from '$features/users'
	import { CONFIG } from '$shared/config'
	import { SectionContainer, SectionTitle } from '$shared/ui/Section'
</script>

<svelte:head>
	<title>{CONFIG.APP.NAME} | Вход</title>
</svelte:head>

<SectionContainer>
	<SectionTitle>
		<h2>Вход</h2>
		<p>Очередь не задерживаем.</p>
	</SectionTitle>
	<UsersFeatureAuth.Login />
</SectionContainer>
