'use client'

import { GetCookie } from '@/functions/cookies/GetCookie'
import xss from 'xss'
import UserLettersComponent from '@/components/body/user/UserLetters'

export default function UserIndex() {
    const username = GetCookie('username')
    return (
        <div>
            <h1 className="text-center">Bem vindo: {xss(username)}!</h1>
            <div>
                <UserLettersComponent></UserLettersComponent>
            </div>
        </div>
    )
}
