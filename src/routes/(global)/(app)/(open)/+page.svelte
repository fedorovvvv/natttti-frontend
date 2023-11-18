<script lang='ts'>
    import _ from 'lodash'
	import { SectionContainer } from "$shared/ui/Section";
	import { CONFIG } from "$shared/config";
	import { Stats, StatsCounter } from "$entities/Stats";
    import {Counter, CounterList} from '$shared/ui/Counter'
	import { StatsRequests, type IStat, type StatCurrent } from "$shared/api/stats.js";
	import { Contributors } from "$widgets/Contributors";
    
    export let data

    let currentStats:IStat[] = []

    const currentStatsController = {
        add(stat:StatCurrent) {
            const statId = +new Date(stat.date)
            const currentIndex = currentStats.findIndex(({id}) => id === statId)
            if (currentIndex !== -1) {
                currentStats[currentIndex] = {
                    ...currentStats[currentIndex],
                    messagesCount: stat.messagesCount,
                    newMembersCount: stat.newMembersCount
                }
            } else {
                currentStats = [...currentStats, {
                    ...stat,
                    id: statId
                }]
            }
        }
    }

    const statsRequests = new StatsRequests()
    const loader = async () => {
        const res = await statsRequests.current()
        if (res._error !== true) {
            currentStatsController.add(res)
        }
        return res
    }
</script>

<svelte:head>
    <title>{CONFIG.APP.NAME} | {currentStats[currentStats.length - 1]?.messagesCount || ''}</title>
</svelte:head>

<main class='page'>
    <SectionContainer tag='section'>
        <h2>Учёт профсоюза</h2>
        <div class="page__counter-wrapper">
            <StatsCounter {loader} let:data>
                <CounterList>
                    <Counter theme='green' label='✉️' value={data?.messagesCount || 0}/>
                    <Counter theme='blue' label='🐣' value={data?.newMembersCount || 0}/>
                </CounterList>
            </StatsCounter>
            <small>сегодня</small>
        </div>
        <Stats data={data.streamed.stats} syncData={currentStats}/>
    </SectionContainer>
    <SectionContainer tag='section' class='page__contributors'>
        <Contributors/>
    </SectionContainer>
</main>

<style lang='sass'>
    .page
        $root: &
        padding-top: 100px
        h2
            text-align: center
            margin-bottom: 30px
        &__counter
            &-wrapper
                display: flex
                flex-direction: column
                align-items: center
                justify-content: center
                margin-bottom: 30px
                small
                    color: var(--gray500)
                    text-align: center
                    font-size: 16px
                    font-weight: 500
                    margin-top: 5px
                    vertical-align: middle
        &__contributors
            @at-root :global &
                margin-top: 100px
</style>