interface ValidFeedbackInterface {
    text: string
}

export function ValidFeedback(props: ValidFeedbackInterface) {
    return <div className="valid-feedback">{props.text}</div>
}
