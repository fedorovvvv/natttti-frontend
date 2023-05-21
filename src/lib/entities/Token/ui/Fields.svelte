<script lang='ts'>
    import {DatePicker} from '$shared/ui/DatePicker'
	import { Form, FormCol, FormRow } from "$shared/ui/Form";
	import Textfield from "@smui/textfield";
	import Select, {Option} from "@smui/select";
	import { ETokenAccessTypes, type IToken } from '$shared/types/token';
	import { TokenHelper } from '$shared/lib/TokenHelper';
	import { writable } from 'svelte/store';

    interface $$Props extends Pick<IToken, 'grantedTo' | 'accessType' | 'expiresAt'> {
        class?:string
    }
    
    let className = ''
    export { className as class }
    export let grantedTo:$$Props['grantedTo'] = ''
    export let accessType:$$Props['accessType'] = ETokenAccessTypes.User
    export let expiresAt:$$Props['expiresAt'] = new Date()

    const valid = writable({
        expiresAt: true,
        grantedTo: true
    })

    const accessTypes:{
        id: ETokenAccessTypes
        label: string
    }[] = [
        {
            id: ETokenAccessTypes.Full,
            label: TokenHelper.getAccessTypeText(ETokenAccessTypes.Full),
        },
        {
            id: ETokenAccessTypes.Admin,
            label: TokenHelper.getAccessTypeText(ETokenAccessTypes.Admin),
        },
        {
            id: ETokenAccessTypes.User,
            label: TokenHelper.getAccessTypeText(ETokenAccessTypes.User),
        }
    ]
    
    $: if (!(expiresAt instanceof Date)) expiresAt = new Date(expiresAt)
    $: $valid.grantedTo = !!grantedTo.length
</script>

<Form class={`Fields ${className}`}>
    <FormCol>
        <FormRow>
            {#if expiresAt instanceof Date}
                <DatePicker bind:valid={$valid.expiresAt} bind:value={expiresAt} label='Действует до' variant='outlined'/>
            {/if}
            <Textfield invalid={!$valid.grantedTo} bind:value={grantedTo} label='Кому' variant='outlined'/>
            <Select label='Доступ' key={(t) => `${t}`} bind:value={accessType} variant='outlined'>
                {#each accessTypes as {id, label} (id)}
                    <Option value={id}>
                        {label}
                    </Option>
                {/each}
            </Select>
        </FormRow>
    </FormCol>
    <svelte:fragment slot='button'>
        <slot name='button' valid={Object.values($valid).every(v => v)}/>
    </svelte:fragment>
</Form>