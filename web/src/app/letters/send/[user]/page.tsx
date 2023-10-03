'use client'

import { useParams } from 'next/navigation'

import xss from 'xss'
import { CenterDiv } from '@/components/body/CenterDiv'
import { FormField } from '@/components/form/FormField'
import { SubmitButton } from '@/components/form/SubmitButton'
import { Label } from '@/components/form/Label'
import { InvalidFeedback } from '@/components/form/InvalidFeedback'
import { ValidFeedback } from '@/components/form/ValidFeedback'
import { GetValues } from '@/functions/fetch/inputs/GetValues'
import { ValidateValues } from '@/functions/fetch/inputs/ValidateValues'
import { PostFetch } from '@/functions/fetch/requests/Post'
import { TranslatorSend } from '@/functions/api/requests/translator/letters/send/TranslatorSend'
import { ShowFlashMessage } from '@/functions/flash/ShowFlashMessage'

export default function SenderLetterPage() {
    const params = useParams()
    const username = xss(params.user as string) // sanitize the username
    const sendLetter = () => {
        const divForm = document.getElementById('form')
        divForm?.classList.remove('was-validated')
        // Inputs
        const inputsNames = ['username', 'sender', 'text']
        const dataInputs = GetValues(window, inputsNames)

        const validateInputs = ValidateValues(dataInputs)

        if (validateInputs) {
            divForm?.classList.add('was-validated')
        } else {
            // Send to api
            const apiHost = process.env.API_HOST as string
            const json = PostFetch(`${apiHost}/letter/`, dataInputs)
            json.then((data) => {
                const requestTranslated = TranslatorSend(data)
                if (requestTranslated.type == 'danger') {
                    ShowFlashMessage('danger', requestTranslated.message)
                } else {
                    ShowFlashMessage('success', 'Letter enviada com sucesso!')
                }
            })
        }
    }
    return (
        <CenterDiv>
            <div id="form" className="needs-validation">
                <h1>Enviar carta para: {username}</h1>
                <input
                    type="hidden"
                    name="username"
                    id="username"
                    value={username}
                />
                <FormField
                    inputId="sender"
                    inputMaxLength={50}
                    inputType="text"
                    invalidFeedbackMessage="Coloque um nome para enviar!"
                    labelText="De:"
                    validFeedbackMessage="Nome de enviador válido!"
                    inputDefaultValue="Anônimo"
                    inputPlaceholder="Enviador"
                ></FormField>
                <div className="mt-3">
                    <Label for="text" text="Mensagem: " />
                    <div>
                        <textarea
                            name="text"
                            id="text"
                            cols={50}
                            rows={10}
                            className="form-control"
                            placeholder="Mensagem"
                            minLength={1}
                            required
                        ></textarea>
                        <ValidFeedback text="Mensagem escrita com sucesso!" />
                        <InvalidFeedback text="Escreva uma mensagem!" />
                    </div>
                </div>
                <div className="mt-3">
                    <SubmitButton text="Enviar carta" onClick={sendLetter} />
                </div>
            </div>
        </CenterDiv>
    )
}
