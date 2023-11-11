import { PropsWithChildren } from 'react'
import { ValidatorFormScript } from '@/components/form/ValidatorFormScript'

interface FormInterface {
    action: string
    method: string
}

export function Form(props: PropsWithChildren<FormInterface>) {
    return (
        <form
            action={props.action}
            method={props.method}
            className="needs-validation"
            noValidate
        >
            {props.children}
            <ValidatorFormScript />
        </form>
    )
}
