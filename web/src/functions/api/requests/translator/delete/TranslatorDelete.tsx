import { TranslatorReturnInterface } from '../common/TranslatorReturnInterface'
import { UserNotExists } from '../common/UserNotExists'

export function TranslatorDelete(json: object): TranslatorReturnInterface {
    // Translators
    const CorrectReturn = (json: object) => {
        if (json.hasOwnProperty('res')) {
            if (json['res'] === 'User deleted!') {
                return {
                    status: true,
                    message: 'Conta deletada com sucesso!',
                    type: 'success',
                }
            }
        }
        return { status: false }
    }
    // Run
    const chain = [CorrectReturn, UserNotExists]
    var translatorMessage: TranslatorReturnInterface | undefined
    chain.forEach((translator) => {
        const translatorReturn = translator(json)
        if (translatorReturn.status == true) {
            translatorMessage = {
                message: translatorReturn.message as string,
                type: translatorReturn.type as 'danger' | 'success',
            }
            return
        }
    })
    if (translatorMessage) {
        return translatorMessage
    } else {
        return {
            message:
                'Um erro desconhecido impediu a conta de ser deletada, tente novamente mais tarde!',
            type: 'danger',
        }
    }
}
