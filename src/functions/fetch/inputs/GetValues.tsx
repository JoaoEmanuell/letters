export function GetValues(window: Window, inputsNames: string[]) {
    const data = {}

    // Get inputs values
    inputsNames.forEach((input) => {
        data[input] = (
            window.document.getElementById(input) as HTMLInputElement
        ).value.trim()
    })
    return data
}
