import { CenterDiv } from '@/components/CenterDiv'
import { Input } from '@/components/form/Input'
import { Label } from '@/components/form/Label'
import { ValidatorFormScript } from '@/components/form/ValidatorFormScript'
import { InvalidFeedback } from '@/components/form/InvalidFeedback'
import { ValidFeedback } from '@/components/form/ValidFeedback'
import { PasswordInput } from '@/components/form/PasswordInput'
import { SubmitButton } from '@/components/form/SubmitButton'

export default function UserRegister() {
    return (
        <main>
            <CenterDiv>
                <form
                    action=""
                    method="get"
                    className="needs-validation"
                    noValidate
                >
                    <h1 className="text-center">Registre-se</h1>
                    <div className="mt-3">
                        <Label for="name" text="Nome: " />
                        <Input
                            type="text"
                            name="name"
                            id="name"
                            required={true}
                            maxLength={60}
                        />
                        <InvalidFeedback text="Nome inválido" />
                        <ValidFeedback text="Nome válido!" />
                    </div>
                    <div className="mt-3">
                        <Label for="username" text="Nome de usuário:" />
                        <Input
                            type="text"
                            name="username"
                            id="username"
                            required={true}
                            maxLength={50}
                        />
                        <InvalidFeedback text="Nome de usuário inválido!" />
                        <ValidFeedback text="Nome de usuário válido!" />
                    </div>
                    <div className="mt-3">
                        <Label for="password" text="Senha:" />
                        <PasswordInput />
                    </div>
                    <div className="mt-3">
                        <SubmitButton text="Cadastrar" />
                    </div>
                    <ValidatorFormScript />
                </form>
            </CenterDiv>
        </main>
    )
}
