import { Cookies } from 'next-client-cookies'
import { GetExpire } from './GetExpire'

export function SetCookie(cookies: Cookies, name: string, value: string) {
    const expireTime = GetExpire()
    cookies.set(name, value, {
        secure: true,
        expires: expireTime,
        sameSite: 'strict',
    })
}
