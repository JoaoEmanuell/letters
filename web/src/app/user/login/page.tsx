'use client'

import { CenterDiv } from '@/components/body/CenterDiv'
import { FormField } from '@/components/form/FormField'
import { Label } from '@/components/form/Label'
import { PasswordInput } from '@/components/form/PasswordInput'
import { SubmitButton } from '@/components/form/SubmitButton'
import { GetValues } from '@/functions/fetch/inputs/GetValues'
import { ValidateValues } from '@/functions/fetch/inputs/ValidateValues'
import { PostFetch } from '@/functions/fetch/requests/Post'
import { TranslatorLogin } from '@/functions/api/requests/translator/user/login/TranslatorLogin'
import { ShowFlashMessage } from '@/functions/flash/ShowFlashMessage'
import { SetCookie } from '@/functions/cookies/SetCookie'

export default function UserLogin() {
    const fetchLoginUser = async () => {
        // Div form
        const divForm = document.getElementById('form')
        divForm?.classList.remove('was-validated')
        // Inputs
        const inputsNames = ['username', 'password']
        const dataInputs = GetValues(window, inputsNames)

        const validateInputs = ValidateValues(dataInputs)

        if (validateInputs) {
            divForm?.classList.add('was-validated')
        } else {
            // Register on api
            const apiHost = process.env.API_HOST as string
            const json = PostFetch(`${apiHost}/user/login/`, dataInputs)
            json.then((data) => {
                const requestTranslated = TranslatorLogin(data)
                if (requestTranslated.type == 'danger') {
                    ShowFlashMessage('danger', requestTranslated.message)
                } else {
                    // Save
                    SetCookie('userToken', data['token']) // User token
                    SetCookie('username', dataInputs['username']) // Username

                    SetCookie('flash', 'success+Login realizado com sucesso!') // Flash message
                    window.location.replace(`/`)
                }
            })
        }
    }
    return (
        <main>
            <CenterDiv>
                <div id="form" className="needs-validation">
                    <h1>Login:</h1>
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
                            text="Login"
                            onClick={fetchLoginUser}
                        ></SubmitButton>
                    </div>
                </div>
            </CenterDiv>
            <CenterDiv>
                <div className="mt-3">
                    <p>Não possui cadastro?</p>
                    <p>
                        <a href="/user/register">Cadastre-se!</a>
                    </p>
                </div>
            </CenterDiv>
        </main>
    )
}
