import React from 'react'
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import { Background, Container, Content } from './styles'
import logoImg from '../../assets/LogoGobarber.svg'
import Input from '../../Components/input'
import Button from '../../Components/button'

const Sign: React.FC = () => {
    return (
        <Container>
            <Content>
                <img src={logoImg} alt="GoBarber" />
                <form>
                    <h1>Faça seu login</h1>
                    <Input
                        icon={FiMail}
                        name="email"
                        type="text"
                        placeholder="E-mail"
                    />
                    <Input
                        icon={FiLock}
                        name="password"
                        type="password"
                        placeholder="Senha"
                    />
                    <Button type="submit">Entrar</Button>
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
