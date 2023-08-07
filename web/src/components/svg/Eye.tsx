"use client"
import Image from "next/image"
import eyeOpen from "../../assets/eye-open.svg"
import eyeSlash from "../../assets/eye-slash.svg"
import { useState } from "react"

export function Eye(){
    const [imageUrl, setImageUrl] = useState(eyeSlash)
    const imageClick = () => {
        if (imageUrl == eyeOpen) {
            setImageUrl(eyeSlash)
        } else {
            setImageUrl(eyeOpen)
        }
    }
    return (
        <Image src={imageUrl} alt="eye-icon" onClick={imageClick}></Image>
    )
}