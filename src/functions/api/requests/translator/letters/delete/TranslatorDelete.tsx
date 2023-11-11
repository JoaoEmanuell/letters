import { TranslatorReturnInterface } from '../../common/TranslatorReturnInterface'
import { TranslatorRun } from '../../common/TranslatorRun'
import { LetterNotExists } from '../../common/LetterNotExists'

export function TranslatorDelete(json: object): TranslatorReturnInterface {
    // Translators
    const CorrectReturn = (json: object) => {
        if (json.hasOwnProperty('res')) {
            return {
                status: true,
                message: 'Letter deleted!',
                type: 'success',
            }
        }
        return { status: false }
    }

    // Run
    return TranslatorRun(json, [CorrectReturn, LetterNotExists])
}
