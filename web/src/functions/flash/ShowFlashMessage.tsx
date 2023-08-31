'use client'

import { FlashMessage } from '../../components/body/flash/FlashMessage'
import { renderToString } from 'react-dom/server'

type flashType = 'success' | 'danger' | undefined
type messageType = string | undefined

export function ShowFlashMessage(flashType: flashType, message: messageType) {
    const divFlash = document.getElementById('divFlash') as HTMLDivElement
    divFlash.innerHTML = ''
    if (message && flashType) {
        const flashMessageComponent = renderToString(
            <FlashMessage message={message} type={flashType} />
        ) // Convert to string
        divFlash.innerHTML = flashMessageComponent
    }
}
