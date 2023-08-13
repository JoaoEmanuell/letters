interface SubmitButtonInterface {
    text: string
}

export function SubmitButton(props: SubmitButtonInterface) {
    return (
        <button type="submit" className="btn btn-primary">
            {props.text}
        </button>
    )
}
