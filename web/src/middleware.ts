import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { GetExpire } from './functions/cookies/GetExpire'

export function middleware(request: NextRequest) {
    // User is not authenticated!
    const userToken = request.cookies.get('userToken')?.value
    if (!userToken) {
        const response = NextResponse.redirect(new URL('/', request.url))
        const expireTime = GetExpire()
        response.cookies.set({
            name: 'flash',
            value: 'danger+Usuário não autenticado!',
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path: '/',
            expires: expireTime,
        })
        return response
    }
}

export const config = {
    matcher: ['/user/logout'],
}
