'use client'

import { CenterDiv } from '@/components/body/CenterDiv'
import { FormField } from '@/components/form/FormField'
import { Label } from '@/components/form/Label'
import { PasswordInput } from '@/components/form/PasswordInput'
import { SubmitButton } from '@/components/form/SubmitButton'
import { TranslatorInfos } from '@/functions/api/requests/translator/user/infos/TranslatorInfos'
import { GetCookie } from '@/functions/cookies/GetCookie'
import { SetCookie } from '@/functions/cookies/SetCookie'
import { GetValues } from '@/functions/fetch/inputs/GetValues'
import { PutFetch } from '@/functions/fetch/requests/Put'
import { ShowFlashMessage } from '@/functions/flash/ShowFlashMessage'
import xss from 'xss'

export default function UserInfos() {
    const name = GetCookie('name')
    const username = GetCookie('username')
    const userToken = GetCookie('userToken')
    const saveUserInformation = async () => {
        // Inputs
        const inputsNames = ['name', 'username', 'password']
        const dataInputs = GetValues(window, inputsNames)
        // New data to send to application
        const userNewData = {
            name: dataInputs['name'],
            username: dataInputs['username'],
            password: dataInputs['password'],
        }
        const apiHost = process.env.API_HOST as string
        const json = PutFetch(
            `${apiHost}/user/detail/${userToken}`,
            userNewData
        )
        json.then((data) => {
            const requestTranslated = TranslatorInfos(data)
            if (requestTranslated.type == 'danger') {
                ShowFlashMessage('danger', requestTranslated.message)
            } else {
                SetCookie('name', userNewData.name) // Name
                SetCookie('username', userNewData.username) // Username
                SetCookie(
                    'flash',
                    `success+Informações do usuário alteradas com sucesso!`
                ) // Flash message
                window.location.replace(`/user/infos/`)
            }
        })
    }
    return (
        <CenterDiv>
            <div id="form" className="needs-validation">
                <h1 className="text-center">Alterar informações</h1>
                <FormField
                    labelText="Nome: "
                    inputType="text"
                    inputId="name"
                    inputMaxLength={60}
                    inputDefaultValue={xss(name)}
                    invalidFeedbackMessage="Nome inválido!"
                    validFeedbackMessage="Nome válido!"
                ></FormField>
                <FormField
                    labelText="Nome de usuário: "
                    inputType="text"
                    inputId="username"
                    inputMaxLength={50}
                    inputDefaultValue={xss(username)}
                    invalidFeedbackMessage="Nome de usuário inválido!"
                    validFeedbackMessage="Nome de usuário válido!"
                ></FormField>
                <div className="mt-3">
                    <Label for="password" text="Senha:" />
                    <PasswordInput />
                </div>
                <div className="mt-3">
                    <SubmitButton
                        text="Salvar alterações"
                        onClick={saveUserInformation}
                    />
                </div>
            </div>
        </CenterDiv>
    )
}
