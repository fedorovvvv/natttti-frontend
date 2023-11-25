<script lang="ts">
	import { GiftEventsFeature } from '$features/giftEvents'
	import { SectionContainer, SectionTitle } from '$shared/ui/Section'
	import { dev } from '$app/environment'
	import { invalidateAll } from '$app/navigation'

	export let data

	const handler = {
		success() {
			invalidateAll()
		}
	}
</script>

<SectionContainer>
	<SectionTitle>
		<h1>Внимание!!🌟</h1>
		<p>
			Это <b>тестовая версия</b> для проверки <b>регистраций/api</b> и сбора <b>багов/метрик</b> для
			<b>оптимизации</b>. Со временем таблица участников будет <b>отчищена</b>, после чего
			<b>будет сделан релиз</b>
			данного функционала с <b>полноценной регистрацией</b>💜
		</p>
	</SectionTitle>
	<GiftEventsFeature.Card
		on:success={handler.success}
		data={data.giftEvent}
		isAllow={data.isAllow}
	/>
</SectionContainer>
