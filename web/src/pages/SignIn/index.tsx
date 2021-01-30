import React from 'react'
import { FiLogIn } from 'react-icons/fi'
import { Background, Container, Content } from './styles'
import logoImg from '../../assets/LogoGobarber.svg'

const Sign: React.FC = () => {
    return (
        <Container>
            <Content>
                <img src={logoImg} alt="GoBarber" />
                <form>
                    <h1>Faça seu login</h1>
                    <input type="text" placeholder="E-mail" />
                    <input type="password" placeholder="Senha" />
                    <button type="submit">Entrar</button>
                    <a href="#teste">Esqueci minha senha</a>
                </form>

                <a href="#teste">
                    <FiLogIn />
                    Criar conta
                </a>
            </Content>
            <Background />
        </Container>
    )
}

export default Sign
