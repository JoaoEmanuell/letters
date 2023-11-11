'use client'

export function RedirectToLetter() {
    const go = () => {
        const username = document.getElementById('username') as HTMLInputElement
        const usernameValue = username.value
        window.location.replace(`/letters/send/${usernameValue}`)
    }
    return (
        <div>
            <input
                type="text"
                name="username"
                id="username"
                placeholder="Nome do usuário"
                className="rounded mx-2"
                minLength={0}
                style={{ height: 32 }}
            />
            <button onClick={go} className="rounded btn btn-success">
                Ir
            </button>
        </div>
    )
}
