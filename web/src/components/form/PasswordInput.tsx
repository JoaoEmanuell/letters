'use client'
import { useState } from 'react'
import { Eye } from '../svg/Eye'
import { Input } from './Input'
import { InvalidFeedback } from './InvalidFeedback'
import { ValidFeedback } from './ValidFeedback'

export function PasswordInput() {
    const [inputType, setInputType] = useState('password')
    const imageClickOpen = () => {
        setInputType('text')
    }
    const imageClickClose = () => {
        setInputType('password')
    }
    return (
        <div className="input-group has-validation">
            <span className="input-group-text">
                <Eye
                    imageClickedEventOpen={imageClickOpen}
                    imageClickedEventClose={imageClickClose}
                />
            </span>
            <Input
                type={inputType}
                name="password"
                id="password"
                required={true}
            />
            <InvalidFeedback text="Senha inválida!" />
            <ValidFeedback text="Senha válida!" />
        </div>
    )
}
