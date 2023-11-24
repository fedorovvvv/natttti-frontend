<script lang="ts">
	import { UsersFeatureAuth } from '$features/users'
	import { CONFIG } from '$shared/config'
	import { SectionContainer, SectionTitle } from '$shared/ui/Section'
</script>

<svelte:head>
	<title>{CONFIG.APP.NAME} | Регистрация</title>
</svelte:head>

<SectionContainer>
	<SectionTitle>
		<h2>Регистрация</h2>
		<p>Пу пу пу</p>
	</SectionTitle>
	<UsersFeatureAuth.Registration />
</SectionContainer>
