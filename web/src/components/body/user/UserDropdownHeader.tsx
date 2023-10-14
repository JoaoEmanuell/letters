import { GetCookie } from '@/functions/cookies/GetCookie'
import dynamic from 'next/dynamic'
import xss from 'xss'

async function UserDropdownHeader() {
    const name = GetCookie('name')
    // User don't connected
    if (name === '') {
        return (
            <li className="nav-item">
                <a
                    className="nav-link active"
                    aria-current="page"
                    href="/user/login"
                >
                    Login
                </a>
            </li>
        )
    } else {
        return (
            <li className="nav-item dropdown">
                <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    Olá: &quot;{xss(name)}&quot;
                </a>
                <ul className="dropdown-menu">
                    <li>
                        <a className="dropdown-item" href="/user">
                            Letters
                        </a>
                    </li>
                    <li>
                        <hr className="dropdown-divider" />
                    </li>
                    <li>
                        <a className="dropdown-item" href="/user/infos">
                            Informações
                        </a>
                    </li>
                    <li>
                        <hr className="dropdown-divider" />
                    </li>
                    <li>
                        <a className="dropdown-item" href="/user/logout">
                            Sair
                        </a>
                    </li>
                </ul>
            </li>
        )
    }
}

export default dynamic(() => Promise.resolve(UserDropdownHeader), {
    ssr: false,
}) // Disable pre render component
