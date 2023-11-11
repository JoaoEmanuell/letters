import { Input } from './Input'
import { InvalidFeedback } from './InvalidFeedback'
import { Label } from './Label'
import { ValidFeedback } from './ValidFeedback'

interface FormFieldInterface {
    labelText: string
    inputType: string
    inputId: string
    inputMaxLength: number
    inputDefaultValue?: string
    inputPlaceholder?: string
    invalidFeedbackMessage: string
    validFeedbackMessage: string
}

export function FormField(props: FormFieldInterface) {
    return (
        <div className="mt-3">
            <Label for={props.inputId} text={props.labelText} />
            <Input
                type={props.inputType}
                name={props.inputId}
                id={props.inputId}
                required={true}
                maxLength={props.inputMaxLength}
                value={props.inputDefaultValue}
                placeholder={props.inputPlaceholder}
            />
            <InvalidFeedback text={props.invalidFeedbackMessage} />
            <ValidFeedback text={props.validFeedbackMessage} />
        </div>
    )
}
