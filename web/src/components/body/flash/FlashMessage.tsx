'use client'

import { CenterDiv } from '../CenterDiv'
import dompurify from 'dompurify' // Sanitize
import { GetCookie } from '@/functions/cookies/GetCookie'
import { RemoveCookie } from '@/functions/cookies/RemoveCookie'
import dynamic from 'next/dynamic'

type flashMessageType = 'success' | 'danger'

interface FlashMessageInterface {
    type?: flashMessageType
    message?: string
}

function FlashMessage(props: FlashMessageInterface) {
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
        // If set the component in html, and use the cookies to configure

        const flashCookie = GetCookie('flash')
        if (flashCookie) {
            const messageType = flashCookie.split('+')[0] as flashMessageType
            const message = flashCookie.split('+')[1] as string
            RemoveCookie('flash') // Delete the cookie
            return returnContent(messageType, message) // Show the message
        }
    }
}

export default dynamic(() => Promise.resolve(FlashMessage), {
    ssr: false,
}) // Disable pre render component
