interface InvalidFeedbackInterface {
    text: string
}

export function InvalidFeedback(props: InvalidFeedbackInterface){
    return (
        <div className="invalid-feedback">
            {props.text}
        </div>
    )
}