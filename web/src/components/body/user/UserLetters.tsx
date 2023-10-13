import { TranslatorDelete } from '@/functions/api/requests/translator/letters/delete/TranslatorDelete'
import { GetCookie } from '@/functions/cookies/GetCookie'
import { DeleteFetch } from '@/functions/fetch/requests/Delete'
import { PostFetch } from '@/functions/fetch/requests/Post'
import { ShowFlashMessage } from '@/functions/flash/ShowFlashMessage'
import dynamic from 'next/dynamic'
import { PropsWithChildren } from 'react'
import React from 'react'
import xss from 'xss'
import Image from 'next/image'
import trash from '../../../../public/trash.svg'

interface UserLettersComponentInterface {}

async function UserLettersComponent(
    props: PropsWithChildren<UserLettersComponentInterface>
) {
    const deleteLetter = (letterToken: string) => {
        const confirmDeleteLetter = window.confirm(
            'Tem certeza que deseja deletar a letter?'
        )
        if (confirmDeleteLetter) {
            const apiHost = process.env.API_HOST as string
            const response = DeleteFetch(
                `${apiHost}/letter/detail/${letterToken}`
            )
            response.then((data) => {
                const requestTranslated = TranslatorDelete(data)
                if (requestTranslated.type == 'danger') {
                    ShowFlashMessage('danger', requestTranslated.message)
                } else {
                    const letterDiv = document.getElementById(
                        letterToken
                    ) as HTMLDivElement
                    letterDiv.className = ''
                    letterDiv.innerHTML = ''
                    window.alert('Letter apagada com sucesso!')
                }
            })
        }
    }
    const username = GetCookie('username')
    const userToken = GetCookie('userToken')
    // Load user letters
    const apiHost = process.env.API_HOST as string
    const userLetters = PostFetch(`${apiHost}/letter/user/`, {
        username: username,
        token: userToken,
    })
    var userLettersContent: {
        date: Date
        sender: string
        text: string
        letter_token: string
    }[][] = []
    await userLetters.then((data) => {
        if (data.length === 0) {
            userLettersContent = []
        } else {
            userLettersContent.push(data as never)
        }
    })
    if (userLettersContent.length === 0) {
        return (
            <div>
                Você ainda não recebeu nenhuma letter!
                {props.children}
            </div>
        )
    } else {
        var letters = <div></div>
        userLettersContent[0].forEach((data) => {
            // date
            const threatedDate = new Date(
                xss(data.date.toString())
            ).toLocaleDateString()
            const dateParagraph = <p>Data: {threatedDate}</p>
            // sender
            const senderParagraph = (
                <p>
                    Enviado por: <strong>{xss(data.sender.toString())}</strong>
                </p>
            )
            // text
            const textParagraph = <p>{xss(data.text.toString())}</p>
            // token
            const letterDelete = (
                <button
                    onClick={() => {
                        deleteLetter(data.letter_token.toString())
                    }}
                    className="btn btn-danger"
                >
                    <Image
                        src={trash}
                        alt="Trash icon"
                        width={18}
                        height={18}
                    />{' '}
                    Apagar letter
                </button>
            )
            // append
            var divForLetter = (
                <div
                    className="border border-solid rounded p-4 mb-2"
                    id={data.letter_token.toString()}
                >
                    {senderParagraph}
                    {dateParagraph}
                    {textParagraph}
                    {letterDelete}
                </div>
            )
            letters = (
                <div>
                    {letters}
                    {divForLetter}
                </div>
            )
        })
        return (
            <div className="mt-4 mb-4">
                <div>{letters}</div>
                {props.children}
            </div>
        )
    }
}

export default dynamic(() => Promise.resolve(UserLettersComponent), {
    ssr: false,
}) // Disable pre render component
