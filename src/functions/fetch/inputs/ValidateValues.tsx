export function ValidateValues(inputsValues: object) {
    let inputsValid = 0
    // Validate if inputs is empty
    Object.entries(inputsValues).forEach(([_, value]) => {
        if (value !== '') {
            inputsValid++
        }
    })
    // Verify if the number of valid inputs is equal a object length
    if (inputsValid != Object.keys(inputsValues).length) {
        return true
    } else {
        return false
    }
}
