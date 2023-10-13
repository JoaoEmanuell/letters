export function LetterNotExists(json: object) {
    if (json.hasOwnProperty('res')) {
        if (json['res'] == "Letter don't exists") {
            return {
                status: true,
                message: 'Usuário não existe!',
                type: 'danger',
            }
        }
    }
    return { status: false }
}
