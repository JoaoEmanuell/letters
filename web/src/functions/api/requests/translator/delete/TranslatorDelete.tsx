import { TranslatorReturnInterface } from '../common/TranslatorReturnInterface'
import { UserNotExists } from '../common/UserNotExists'
import { TranslatorRun } from '../common/TranslatorRun'

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
    return TranslatorRun(json, [CorrectReturn, UserNotExists])
}
