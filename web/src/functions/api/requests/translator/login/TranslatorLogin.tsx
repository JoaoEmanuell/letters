import { TranslatorReturnInterface } from '../common/TranslatorReturnInterface'
import { UserNotExists } from '../common/UserNotExists'
import { TranslatorRun } from '../common/TranslatorRun'

export function TranslatorLogin(json: object): TranslatorReturnInterface {
    // Translators
    const CorrectReturn = (json: object) => {
        if (json.hasOwnProperty('token')) {
            return {
                status: true,
                message: 'Login realizado com sucesso!',
                type: 'success',
            }
        }
        return { status: false }
    }

    const InvalidPassword = (json: object) => {
        if (json.hasOwnProperty('res')) {
            if (json['res'] == 'Invalid password') {
                return {
                    status: true,
                    message: 'Senha inválida',
                    type: 'danger',
                }
            }
        }
        return { status: false }
    }
    // Run
    return TranslatorRun(json, [CorrectReturn, UserNotExists, InvalidPassword])
    /*const chain = [CorrectReturn, UserNotExists, InvalidPassword]
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
                'Um erro desconhecido impediu o registro, tente novamente mais tarde!',
            type: 'danger',
        }
    }*/
}
