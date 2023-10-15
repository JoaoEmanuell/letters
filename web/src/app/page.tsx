import { CenterDiv } from '@/components/body/CenterDiv'
import { RedirectToLetter } from '@/components/body/RedirectToLetter'

export default function Home() {
    return (
        <div>
            <h1 className="text-center">Letters</h1>
            <CenterDiv className="mt-4">
                <div className="accordion">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseOne"
                                aria-expanded="false"
                                aria-controls="collapseOne"
                            >
                                O que é letters?
                            </button>
                        </h2>
                        <div
                            id="collapseOne"
                            className="accordion-collapse collapse"
                            data-bs-parent="#accordionExample"
                        >
                            <div className="accordion-body text-center">
                                Letters é um website que serve para o envio de
                                letters (cartas) de forma anônima para usuários
                                registrados.
                                <br />
                                Você pode criar uma conta, gratuitamente, e
                                começar a receber letters.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseTwo"
                                aria-expanded="false"
                                aria-controls="collapseTwo"
                            >
                                Como enviar uma letter?
                            </button>
                        </h2>
                        <div
                            id="collapseTwo"
                            className="accordion-collapse collapse"
                            data-bs-parent="#accordionExample"
                        >
                            <div className="accordion-body text-center">
                                O processo de envio de uma letter é bem simples,
                                basta digitar, no campo abaixo, o nome de
                                usuário de quem você deseja enviar a letter e
                                clicar em ir, automaticamente você será
                                redirecionado para a página de envio da letter.
                            </div>
                            <CenterDiv>
                                <RedirectToLetter />
                            </CenterDiv>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseThree"
                                aria-expanded="false"
                                aria-controls="collapseThree"
                            >
                                Como receber letters?
                            </button>
                        </h2>
                        <div
                            id="collapseThree"
                            className="accordion-collapse collapse"
                            data-bs-parent="#accordionExample"
                        >
                            <div className="accordion-body text-center">
                                Para receber letters você deve criar um{' '}
                                <a href="/user/register">conta</a> ou fazer{' '}
                                <a href="/user/login">login</a>, caso já possua
                                uma.
                                <br />
                                Acesse a barra de navegação e clicar em{' '}
                                <em>&quot;Receber letters&quot;</em>, ao clicar
                                nele, o link para o recebimento de letters será
                                copiado para a sua área de transferência
                            </div>
                        </div>
                    </div>
                </div>
            </CenterDiv>
        </div>
    )
}
