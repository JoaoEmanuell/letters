export async function DeleteFetch(url: string, data: object = {}) {
    const response = await fetch(url, {
        method: 'DELETE',
        mode: 'cors',
        cache: 'default',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    return response.json()
}
