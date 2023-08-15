import { CenterDiv } from '@/components/CenterDiv'
import { Label } from '@/components/form/Label'
import { Form } from '@/components/form/Form'
import { PasswordInput } from '@/components/form/PasswordInput'
import { SubmitButton } from '@/components/form/SubmitButton'
import { FormField } from '@/components/form/FormField'

export default function UserRegister() {
    return (
        <main>
            <CenterDiv>
                <Form action="" method="get">
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
                        <SubmitButton text="Cadastrar" />
                    </div>
                </Form>
            </CenterDiv>
        </main>
    )
}
