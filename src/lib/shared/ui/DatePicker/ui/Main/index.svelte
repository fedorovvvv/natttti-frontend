<script lang='ts'>
    import Textfield from '@smui/textfield';
    import { DateInput } from 'date-picker-svelte'
    import { createFormat, parse } from 'date-picker-svelte/parse'
    import { toText } from 'date-picker-svelte/date-utils'
	import type { ComponentProps } from 'svelte';

	interface $$Props extends Omit<ComponentProps<Textfield>, 'value' | 'class' | 'format' | 'visible'> {
		class?:string
        value:Date
        format?:string
        visible?:boolean
        valid?:boolean
	}
	
	let className = ''
	export { className as class }
    export let value:$$Props['value'] = new Date()
    export let format:$$Props['format'] = "yyyy-MM-dd HH:mm:ss"
    export let visible:$$Props['visible'] = false
    export let valid:$$Props['valid'] = true

    let formatToken = createFormat(format || '')
    $: formatToken = createFormat(format || '')
    

    let textFieldValue = toText(value, formatToken)

    const controller = {
        updateValue() {
            if (textFieldValue.length) {
                const parseData = parse(textFieldValue, formatToken, new Date())
                if (parseData.date !== null) {
                    valid = true
                    value = parseData.date
                } else {
                    valid = false
                }
            } else {
                valid = false
            }
        }
    }


    const handler = {
        inputChange() {
            controller.updateValue()
        },
        select() {
            textFieldValue = toText(value, formatToken)
        },
        focus() {
            visible = true
        },
        blur(e:CustomEvent<FocusEvent>) {
            if (!(e.detail.relatedTarget as HTMLElement)?.closest?.('.picker')) {
                visible = false
            }
        }
    }
	
</script>

<div class={`DatePicker ${className}`}>
    <DateInput {format} bind:value on:select={handler.select} bind:visible/>
    <Textfield invalid={!valid} bind:value={textFieldValue} on:change={handler.inputChange} on:focus={handler.focus} on:blur={handler.blur} {...$$restProps}/>
</div>

<style lang='sass'>
	.DatePicker
        display: block
        position: relative
        --date-picker-foreground: var(--clue-color-gray-800)
        --date-picker-background: #fff
        --date-picker-highlight-border: var(--clue-color-primary-400)
        --date-picker-highlight-shadow: green
        --date-picker-selected-color: var(--clue-color-primary-800)
        --date-picker-selected-background: transparent
        .date-time-field
            @at-root :global &
                position: absolute!important
                top: 0
                left: 0
                width: 100%
                height: 100%
                visibility: hidden
                pointer-events: none
                background: red
                input
                    height: 100%
                    width: 100%
                .picker
                    visibility: visible
                    pointer-events: auto
        .mdc-text-field
            @at-root :global &
                width: 100%
</style>