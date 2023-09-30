import { UsernameAlreadyExistis } from '../common/UsernameAlreadyExistis'
import { TranslatorReturnInterface } from '../common/TranslatorReturnInterface'
import { TranslatorRun } from '../common/TranslatorRun'

export function TranslatorRegister(json: object): TranslatorReturnInterface {
    // Translators
    const CorrectReturn = (json: object) => {
        if (json.hasOwnProperty('token')) {
            return {
                status: true,
                message: 'Usuário registrado com sucesso!',
                type: 'success',
            }
        } else {
            return { status: false }
        }
    }
    // Run
    return TranslatorRun(json, [CorrectReturn, UsernameAlreadyExistis])
    /*const chain = [CorrectReturn, UsernameAlreadyExistis]
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
