import { CenterDiv } from '@/components/CenterDiv'
import { Form } from '@/components/form/Form'
import { FormField } from '@/components/form/FormField'
import { Label } from '@/components/form/Label'
import { PasswordInput } from '@/components/form/PasswordInput'
import { SubmitButton } from '@/components/form/SubmitButton'

export default function UserLogin() {
    return (
        <main>
            <CenterDiv>
                <Form action="" method="get">
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
                        <SubmitButton text="Cadastrar" />
                    </div>
                </Form>
            </CenterDiv>
        </main>
    )
}
