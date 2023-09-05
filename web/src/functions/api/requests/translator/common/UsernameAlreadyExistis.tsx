export function UsernameAlreadyExistis(json: object) {
    if (json.hasOwnProperty('username')) {
        return {
            status: true,
            message: 'Nome de usuário repetido!',
            type: 'danger',
        }
    } else {
        return { status: false }
    }
}
