'use client'

import { CenterDiv } from '@/components/body/CenterDiv'
import { RemoveCookie } from '@/functions/cookies/RemoveCookie'
import { SetCookie } from '@/functions/cookies/SetCookie'

export default function UserLogout() {
    const logout = () => {
        const cookiesName = ['name', 'username', 'userToken']
        cookiesName.forEach((cookieName) => {
            RemoveCookie(cookieName)
        })
        SetCookie('flash', 'success+Saída realizada com sucesso!') // Flash message
        window.location.replace('/')
    }
    return (
        <main>
            <h1 className="text-center">Deseja sair da aplicação?</h1>
            <div className="container mt-2">
                <CenterDiv className="p-4">
                    <button
                        type="button"
                        className="btn btn-danger ms-1"
                        onClick={logout}
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
