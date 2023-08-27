export async function PutFetch(url: string, data: object = {}) {
    const response = await fetch(url, {
        method: 'PUT',
        mode: 'cors',
        cache: 'default',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    return response.json()
}
