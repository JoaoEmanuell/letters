import { Cookies } from 'next-client-cookies'

export function GetCookie(cookies: Cookies, name: string) {
    return cookies.get(name)
}
