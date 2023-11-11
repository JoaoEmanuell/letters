import { TranslatorReturnInterface } from '../../common/TranslatorReturnInterface'
import { TranslatorRun } from '../../common/TranslatorRun'
import { UserNotExists } from '../../common/UserNotExists'
import { UsernameAlreadyExistis } from '../../common/UsernameAlreadyExistis'

export function TranslatorInfos(json: object): TranslatorReturnInterface {
    // Translators
    const CorrectReturn = (json: object) => {
        if (json.hasOwnProperty('res')) {
            if (json['res'] === 'Successfully changed user data') {
                return {
                    status: true,
                    message: 'Informações do usuário alteradas com sucesso!',
                    type: 'success',
                }
            }
        }
        return { status: false }
    }
    // Run
    return TranslatorRun(json, [
        CorrectReturn,
        UsernameAlreadyExistis,
        UserNotExists,
    ])
}
