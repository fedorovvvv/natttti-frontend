<script lang='ts'>
    import {DatePicker} from '$shared/ui/DatePicker'
	import { Form, FormCol, FormRow } from "$shared/ui/Form";
	import Textfield from "@smui/textfield";
	import Select, {Option} from "@smui/select";
	import { TokenAccessTypes } from '$shared/types/token';

    interface $$Props {
        class?:string
    }
    
    let className = ''
    export { className as class }

    const accessTypes:{
        id: TokenAccessTypes
        label: string
    }[] = [
        {
            id: TokenAccessTypes.Full,
            label: '🌟Полный',
        },
        {
            id: TokenAccessTypes.Admin,
            label: '🐥Админ',
        },
        {
            id: TokenAccessTypes.User,
            label: '🐣Смертный',
        }
    ]
    
</script>

<Form class={`Fields ${className}`}>
    <FormCol>
        <FormRow>
            <DatePicker value={new Date()} label='Действует до' variant='outlined'/>
            <Textfield value='' label='Кому' variant='outlined'/>
            <Select label='Доступ' value='' variant='outlined'>
                {#each accessTypes as {id, label} (id)}
                    <Option value={`${id}`}>
                        {label}
                    </Option>
                {/each}
            </Select>
        </FormRow>
    </FormCol>
    <svelte:fragment slot='button'>
        <slot name='button'/>
    </svelte:fragment>
</Form>