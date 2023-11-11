export async function GetFetch(url: string) {
    const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'default',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return response.json()
}
