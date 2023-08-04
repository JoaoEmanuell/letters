interface LabelInterface {
    text: string,
    for: string,
}

export function Label(props: LabelInterface) {
      return (
        <label htmlFor={props.for} className="form-label">{props.text}</label>
      )
  }
