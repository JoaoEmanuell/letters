import { GetCookie } from '@/functions/cookies/GetCookie'

interface GetMyLetterLinkInterface {
    buttonText: string
    className?: string
}

export function GetMyLetterLink(props: GetMyLetterLinkInterface) {
    const getLetterLink = () => {
        const username = GetCookie('username')
        const url = window.location.host
        navigator.clipboard.writeText(`https://${url}/letters/send/${username}`)
        window.alert('Link para receber letters copiado com sucesso!')
    }
    return (
        <button className={props.className} onClick={getLetterLink}>
            {props.buttonText}
        </button>
    )
}
