import { PropsWithChildren } from 'react'

interface CenterDivInterface {
    className?: string
}

export function CenterDiv(props: PropsWithChildren<CenterDivInterface>) {
    const className = `d-flex justify-content-center mb-4 ${props.className}`
    return <div className={className}>{props.children}</div>
}
