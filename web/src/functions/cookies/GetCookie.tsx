export function GetCookie(cookieName: string) {
    const name = `${cookieName}`
    const cookies = document.cookie.split(';')
    var cookieValue = ''

    cookies.forEach((cookie) => {
        const cookieKey = cookie.split('=')[0].trim()
        if (cookieKey == name) {
            cookieValue = cookie.split('=')[1].trim()
        }
    })

    return cookieValue
}
