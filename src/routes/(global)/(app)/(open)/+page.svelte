<script lang='ts'>
	import { ChartHelper } from "$shared/lib/Chart/ChartHelper";
    import _ from 'lodash'
	import dayjs from "dayjs";
	import type { ComponentProps } from "svelte";
	import { TimeScale } from "chart.js";
	import { ChartGrid } from "$shared/ui/Chart/ChartGrid";
	import { Box } from "$shared/ui/Box";
	import { SectionContainer } from "$shared/ui/Section";
	import { CONFIG } from "$shared/config";
	import { Stats, StatsCounter } from "$entities/Stats";
    import {Counter, CounterList} from '$shared/ui/Counter'
	import { StatsRequests } from "$shared/api/stats.js";
    
    export let data

    const statsRequests = new StatsRequests()
    const loader = async () => {
        return await statsRequests.current()
    }
</script>

<svelte:head>
    <title>{CONFIG.APP.NAME}</title>
</svelte:head>

<main class='page'>
    <SectionContainer>
        <h2>Учёт профсоюза</h2>
        <div class="page__counter-wrapper">
            <StatsCounter {loader} let:data>
                <CounterList>
                    <Counter theme='green' value={data?.messagesCount || 0}/>
                    <Counter theme='blue' value={data?.newMembersCount || 0}/>
                </CounterList>
            </StatsCounter>
            <small>сегодня</small>
        </div>
        <Stats data={data.streamed.stats}/>
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
</style>