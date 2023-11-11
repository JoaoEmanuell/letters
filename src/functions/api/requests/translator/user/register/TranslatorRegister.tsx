import { UsernameAlreadyExistis } from '../../common/UsernameAlreadyExistis'
import { TranslatorReturnInterface } from '../../common/TranslatorReturnInterface'
import { TranslatorRun } from '../../common/TranslatorRun'

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
}
