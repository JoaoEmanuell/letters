'use client'

import { CenterDiv } from '@/components/body/CenterDiv'
import { Label } from '@/components/form/Label'
import { PasswordInput } from '@/components/form/PasswordInput'
import { SubmitButton } from '@/components/form/SubmitButton'
import { FormField } from '@/components/form/FormField'
import { GetValues } from '@/functions/fetch/inputs/GetValues'
import { ValidateValues } from '@/functions/fetch/inputs/ValidateValues'
import { PostFetch } from '@/functions/fetch/requests/Post'
import { ShowFlashMessage } from '@/functions/flash/ShowFlashMessage'
import { TranslatorRegister } from '@/functions/api/requests/translator/register/TranslatorRegister'
import { SetCookie } from '@/functions/cookies/SetCookie'
import { GetCookie } from '@/functions/cookies/GetCookie'

export default function UserRegister() {
    // Validate if user is authenticated
    if (GetCookie('userToken') !== '') {
        window.location.replace(`/`)
    }
    const fetchUserRegister = async () => {
        // Div form
        const divForm = document.getElementById('form')
        divForm?.classList.remove('was-validated')
        // Inputs
        const inputsNames = ['name', 'username', 'password']

        const dataInputs = GetValues(window, inputsNames)

        const validateInputs = ValidateValues(dataInputs)

        if (validateInputs) {
            divForm?.classList.add('was-validated')
        } else {
            // Register on api
            const apiHost = process.env.API_HOST as string
            const json = PostFetch(`${apiHost}/user/`, dataInputs)
            json.then((data) => {
                // Validate
                const requestTranslated = TranslatorRegister(data)
                if (requestTranslated.type == 'danger') {
                    ShowFlashMessage('danger', requestTranslated.message)
                } else {
                    // Save
                    SetCookie('userToken', data['token']) // User token
                    SetCookie('name', dataInputs['name']) // Name
                    SetCookie('username', dataInputs['username']) // Username

                    SetCookie(
                        'flash',
                        'success+Registro finalizado com sucesso!'
                    ) // Flash message
                    window.location.replace(`/`)
                }
            })
        }
    }
    return (
        <main>
            <CenterDiv>
                <div id="form" className="needs-validation">
                    <h1 className="text-center">Registre-se</h1>
                    <FormField
                        labelText="Nome: "
                        inputType="text"
                        inputId="name"
                        inputMaxLength={60}
                        invalidFeedbackMessage="Nome inválido!"
                        validFeedbackMessage="Nome válido!"
                    ></FormField>
                    <FormField
                        labelText="Nome de usuário: "
                        inputType="text"
                        inputId="username"
                        inputMaxLength={50}
                        invalidFeedbackMessage="Nome de usuário inválido!"
                        validFeedbackMessage="Nome de usuário válido!"
                    ></FormField>
                    <div className="mt-3">
                        <Label for="password" text="Senha:" />
                        <PasswordInput />
                    </div>
                    <div className="mt-3">
                        <SubmitButton
                            text="Cadastrar"
                            onClick={fetchUserRegister}
                        />
                    </div>
                </div>
            </CenterDiv>
        </main>
    )
}
