'use client'

import { useParams } from 'next/navigation'

import { CenterDiv } from '@/components/body/CenterDiv'
import { Form } from '@/components/form/Form'
import { FormField } from '@/components/form/FormField'
import { SubmitButton } from '@/components/form/SubmitButton'
import { Label } from '@/components/form/Label'
import { InvalidFeedback } from '@/components/form/InvalidFeedback'
import { ValidFeedback } from '@/components/form/ValidFeedback'

export default function SenderLetterPage() {
    const params = useParams()
    const userName = params.user
    return (
        <CenterDiv>
            <Form action="" method="GET">
                <h1>Enviar carta para: {userName}</h1>
                <input
                    type="hidden"
                    name="username"
                    id="username"
                    value={userName}
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
                    <CenterDiv>
                        <textarea
                            name="text"
                            id="text"
                            cols={50}
                            rows={10}
                            className="form-control"
                            placeholder="Mensagem"
                        ></textarea>
                    </CenterDiv>
                    <ValidFeedback text="Mensagem escrita com sucesso!" />
                    <InvalidFeedback text="Escreva uma mensagem!" />
                </div>
                <div className="mt-3">
                    <SubmitButton text="Enviar carta" />
                </div>
            </Form>
        </CenterDiv>
    )
}
