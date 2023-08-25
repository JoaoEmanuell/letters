interface InputInterface {
    type: string
    name: string
    id: string
    required?: boolean
    maxLength?: number
    value?: string
    placeholder?: string
}

export function Input(props: InputInterface) {
    return (
        <input
            type={props.type}
            name={props.name}
            id={props.id}
            required={props.required}
            maxLength={props.maxLength}
            defaultValue={props.value}
            placeholder={props.placeholder}
            className="form-control"
        />
    )
}
