interface InputInterface {
    type: string
    name: string
    id: string
    required?: boolean
    maxLength?: number
}

export function Input(props: InputInterface) {
    return (
        <input
            type={props.type}
            name={props.name}
            id={props.id}
            required={props.required}
            maxLength={props.maxLength}
            className="form-control"
        />
    )
}
