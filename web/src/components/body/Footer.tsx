import Image from 'next/image'
import github from '../../assets/github.svg'

export function Footer() {
    const date = new Date()
    const year = date.getFullYear()
    return (
        <footer className="footer mt-auto px-4 py-1 border-top">
            <div className="d-flex justify-content-between">
                <p>
                    <a
                        href="/contact"
                        className="link-info link-offset-2 link-underline link-underline-opacity-0"
                        target="_blank"
                    >
                        Contato
                    </a>
                </p>
                <p>&copy; {year} João Emanuel</p>
                <p>
                    <a
                        href="https://github.com/JoaoEmanuell/"
                        target="_blank"
                        className="px-2 mb-2"
                    >
                        <Image
                            src={github}
                            alt="github-icon"
                            width={18}
                            height={24}
                        />
                    </a>
                </p>
            </div>
        </footer>
    )
}
