import { TranslatorReturnInterface } from '../common/TranslatorReturnInterface'

interface chainFunction {
    (json: object): {
        status: boolean
        message?: string
        type?: 'success' | 'danger' | string
    }
}

export function TranslatorRun(
    json: object,
    chain: chainFunction[]
): TranslatorReturnInterface {
    var translatorMessage: TranslatorReturnInterface | undefined
    chain.forEach((translator) => {
        // forEach chain translators
        const translatorReturn = translator(json) // Get the return value
        if (translatorReturn.status == true) {
            // Success return
            translatorMessage = {
                message: translatorReturn.message as string,
                type: translatorReturn.type as 'danger' | 'success',
            } // Config the translatorMessage to return
            return // End loop
        }
    })
    if (translatorMessage) {
        return translatorMessage
    } else {
        // Case none object in chain return a valid
        return {
            message:
                'Um erro desconhecido impediu a conta de ser deletada, tente novamente mais tarde!',
            type: 'danger',
        }
    }
}
