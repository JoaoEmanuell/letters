import { GetExpire } from './GetExpire'

export function SetCookie(name: string, value: string) {
    const expireTime = GetExpire().toUTCString()

    document.cookie = `${name.trim()}=${value};expires=${expireTime};path=/;SameSite=Strict;Secure`
}
