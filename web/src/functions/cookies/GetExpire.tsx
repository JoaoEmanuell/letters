export function GetExpire() {
    const date = new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000) // 6 months
    return date
}
