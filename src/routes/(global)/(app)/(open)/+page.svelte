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
    
    export let data

    let chart:ComponentProps<ChartGrid> | undefined = undefined

    const loadChart = async (stats:typeof data['streamed']['stats']) => {
        try {
            const response = await stats

            if (response._error) {
                throw new Error(response.title)
            }
            
            const data = response.map(stat => {
                return {
                    x: +dayjs(stat.date).toDate(),
                    messagesCount: stat.messagesCount,
                    newMembersCount: stat.newMembersCount,
                }
            }).sort((a, b) => b.x - a.x)
    
            chart = {
                data: {
                    datasets: [
                        {
                            label: 'Сообщений',
                            data: data.map(s => {
                                return {
                                    x: s.x,
                                    y: s.messagesCount
                                }
                            }),
                            backgroundColor: 'green',
                            borderColor: 'green',
                        },
                        {
                            label: 'Вступило',
                            data: data.map(s => {
                                return {
                                    x: s.x,
                                    y: s.newMembersCount
                                }
                            }),
                            backgroundColor: 'blue',
                            borderColor: 'blue',
                        }
                    ]
                },
                register: [TimeScale],
                options: {
                    scales: {
                        y: {
                            title: {
                                text: 'кол-во',
                                display: true,
                            }
                        },
                        x: {
                            type: 'time',
                        }
                    }
                }
            }
            
        } catch (error) {
            console.error(error)
        }
    }

    loadChart(data.streamed.stats)
    
</script>

<svelte:head>
    <title>{CONFIG.APP.NAME}</title>
</svelte:head>

<main class='page'>
    <SectionContainer>
        <h2>Учёт профсоюза</h2>
        <Box class='page__chart-box'>
            {#if chart}
                <div class="page__chart-scroll">
                    <ChartGrid {...chart} class='page__chart'/>
                </div>
            {:else}
                <b class='page__chart-load'>Поиск архивов...</b>
            {/if}
        </Box>
    </SectionContainer>
</main>

<style lang='sass'>
    .page
        $root: &
        padding-top: 100px
        h2
            text-align: center
            margin-bottom: 30px
        &__chart
            @at-root :global #{$root} &
                &-scroll
                    min-width: 700px
                    width: 100%
                    height: 100%
                &-box
                    overflow: auto
                    height: 500px
                    display: flex
                    position: relative
                &-load
                    position: absolute
                    display: block
                    font-size: 50px
                    color: var(--gray50)
                    top: 50%
                    left: 50%
                    width: 100%
                    text-align: center
                    transform: translate(-50%, -50%)
</style>