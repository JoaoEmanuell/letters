interface SubmitButtonInterface {
    text: string
    onClick?: Function
}

export function SubmitButton(props: SubmitButtonInterface) {
    const onClickCallEvent = () => {
        if (props.onClick != undefined) {
            props.onClick()
        }
    }
    return (
        <button
            type="submit"
            className="btn btn-primary"
            onClick={onClickCallEvent}
        >
            {props.text}
        </button>
    )
}
