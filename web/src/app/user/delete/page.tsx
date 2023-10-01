'use client'

import { CenterDiv } from '@/components/body/CenterDiv'
import { GetCookie } from '@/functions/cookies/GetCookie'
import { RemoveCookie } from '@/functions/cookies/RemoveCookie'
import { SetCookie } from '@/functions/cookies/SetCookie'
import { DeleteFetch } from '@/functions/fetch/requests/Delete'
import { TranslatorDelete } from '@/functions/api/requests/translator/user/delete/TranslatorDelete'
import { ShowFlashMessage } from '@/functions/flash/ShowFlashMessage'

export default function UserDelete() {
    const deleteUser = () => {
        // Delete from api
        const apiHost = process.env.API_HOST as string
        const userToken = GetCookie('userToken')
        const json = DeleteFetch(`${apiHost}/user/detail/${userToken}`)
        json.then((data) => {
            const requestTranslated = TranslatorDelete(data)
            if (requestTranslated.type == 'danger') {
                ShowFlashMessage('danger', requestTranslated.message)
            } else {
                // Delete cookies

                const cookiesName = ['name', 'username', 'userToken']
                cookiesName.forEach((cookieName) => {
                    RemoveCookie(cookieName)
                })
                SetCookie('flash', 'success+Conta deletada com sucesso!') // Flash message
                window.location.replace('/')
            }
        })
    }
    return (
        <main>
            <h1 className="text-center">Deseja deletar sua conta?</h1>
            <p className="text-center">
                <strong>
                    Isso também irá deletar todas as letters recebidas por você!
                </strong>
            </p>
            <div className="container mt-2">
                <CenterDiv className="p-4">
                    <button
                        type="button"
                        className="btn btn-danger ms-1"
                        onClick={deleteUser}
                    >
                        Sim
                    </button>
                    <a className="btn btn-success ms-1" href="/">
                        Não
                    </a>
                </CenterDiv>
            </div>
        </main>
    )
}
