'use client'

import { CenterDiv } from '../CenterDiv'
import dompurify from 'dompurify'

interface FlashMessage {
    type: 'success' | 'danger'
    message: string
}

export function FlashMessage(props: FlashMessage) {
    const divFlashClasses = {
        success: 'alert alert-success',
        danger: 'alert alert-danger',
    }

    const flashClass = divFlashClasses[props.type]

    return (
        <CenterDiv>
            <div className={flashClass}>
                {dompurify.sanitize(props.message)}
            </div>
        </CenterDiv>
    )
}
