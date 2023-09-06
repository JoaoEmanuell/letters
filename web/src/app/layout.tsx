import type { Metadata } from 'next'
import 'bootstrap/dist/css/bootstrap.min.css'

import { Header } from '@/components/body/Header'
import { Footer } from '@/components/body/Footer'
import { FlashMessage } from '@/components/body/flash/FlashMessage'

export const metadata: Metadata = {
    title: 'Letters',
    description: 'Letters app',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className="h-100">
            <head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <script src="/static/js/bootstrap.min.js" defer></script>
            </head>
            <body className="d-flex flex-column h-100">
                <Header />
                <div id="divFlash" className="mt-4">
                    <FlashMessage></FlashMessage>
                </div>
                <main className="container mt-4">{children}</main>
                <Footer />
            </body>
        </html>
    )
}
