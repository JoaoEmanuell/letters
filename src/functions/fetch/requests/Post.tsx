export async function PostFetch(url: string, data: object = {}) {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    return response.json()
}
