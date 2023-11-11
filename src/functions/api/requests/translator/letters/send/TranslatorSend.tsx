import { TranslatorReturnInterface } from '../../common/TranslatorReturnInterface'
import { TranslatorRun } from '../../common/TranslatorRun'

export function TranslatorSend(json: object): TranslatorReturnInterface {
    // Translators
    const CorrectReturn = (json: object) => {
        if (json.hasOwnProperty('res')) {
            return {
                status: true,
                message: 'Letter sent successfully',
                type: 'success',
            }
        }
        return { status: false }
    }

    const InvalidUsername = (json: object) => {
        if (json.hasOwnProperty('res')) {
            if (json['detail'] == 'Username is not valid') {
                return {
                    status: true,
                    message: 'O nome do usuário recebedor é inválido!',
                    type: 'danger',
                }
            }
        }
        return { status: false }
    }
    // Run
    return TranslatorRun(json, [CorrectReturn, InvalidUsername])
}
