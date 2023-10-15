import { CenterDiv } from '@/components/body/CenterDiv'
import { Github } from 'lucide-react'

export default function ContactPage() {
    return (
        <div>
            <h1 className="text-center">Contato</h1>
            <br />
            <CenterDiv>
                <ul className="list-group">
                    <li className="list-group-item">
                        <a
                            href="https://github.com/JoaoEmanuell/"
                            target="_blank"
                            className="link-info link-offset-2 link-underline link-underline-opacity-0"
                        >
                            <Github color="#000" />
                            <span className="px-2">Github</span>
                        </a>
                    </li>
                </ul>
            </CenterDiv>
        </div>
    )
}
