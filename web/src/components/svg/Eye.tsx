"use client"
import Image from "next/image"
import eyeOpen from "../../assets/eye-open.svg"
import eyeSlash from "../../assets/eye-slash.svg"
import { useState } from "react"

interface EyeInterface {
    imageClickedEventOpen?: Function,
    imageClickedEventClose?: Function
}

export function Eye(props: EyeInterface){
    const imageClickedEventOpen = props.imageClickedEventOpen
    const imageClickedEventClose = props.imageClickedEventClose
    const [imageUrl, setImageUrl] = useState(eyeSlash)
    const [altText, setAltText] = useState("eye-closed")

    const callClickedEvent = (event: Function | undefined) => {
        if (event != undefined) {
            event()
        }
    }

    const imageClick = () => {
        if (imageUrl == eyeOpen) {
            callClickedEvent(imageClickedEventClose)
            setImageUrl(eyeSlash)
            setAltText("eye-closed")
        } else {
            callClickedEvent(imageClickedEventOpen)
            setImageUrl(eyeOpen)
            setAltText("eye-open")
        }
    }

    return (
        <Image src={imageUrl} alt={altText} onClick={imageClick}></Image>
    )
}