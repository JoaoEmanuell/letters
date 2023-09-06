'use client'

import { CenterDiv } from '../CenterDiv'
import dompurify from 'dompurify'

type flashMessageType = 'success' | 'danger'

interface FlashMessage {
    type?: flashMessageType
    message?: string
}

export function FlashMessage(props: FlashMessage) {
    // Jsx return
    const returnContent = (
        flashMessageType: flashMessageType,
        message: string
    ) => {
        const divFlashClasses = {
            success: 'alert alert-success',
            danger: 'alert alert-danger',
        } // Bootstrap styles to div
        const flashClass = divFlashClasses[flashMessageType] // Get the style
        return (
            <CenterDiv>
                <div className={flashClass}>{dompurify.sanitize(message)}</div>
            </CenterDiv>
        ) // Sanitize the message
    }

    // If call in a function
    if (props.type && props.message) {
        return returnContent(props.type, props.message)
    } else {
        // If set the component in html, and use the query params to configure
        try {
            const urlParams = new URLSearchParams(window.location.search)
            const flashMessage = urlParams.get('flash')
            if (flashMessage) {
                const messageType = flashMessage.split(
                    ';'
                )[0] as flashMessageType
                const message = flashMessage.split(';')[1] as string
                return returnContent(messageType, message)
            }
        } catch (error) {
            if (error instanceof ReferenceError) {
                // Case don't exists the window
                return
            }
        }
    }
}
