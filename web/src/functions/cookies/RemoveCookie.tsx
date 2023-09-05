import { Cookies } from 'next-client-cookies'

export function RemoveCookie(cookies: Cookies, name: string) {
    return cookies.remove(name)
}
