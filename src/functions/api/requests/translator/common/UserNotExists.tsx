export function UserNotExists(json: object) {
    if (json.hasOwnProperty('res')) {
        if (json['res'] == "User don't exists") {
            return {
                status: true,
                message: 'Usuário não existe!',
                type: 'danger',
            }
        }
    }
    return { status: false }
}
