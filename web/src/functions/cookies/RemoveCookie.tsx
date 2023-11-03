export function RemoveCookie(name: string) {
    try {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`
    } catch {}
}
