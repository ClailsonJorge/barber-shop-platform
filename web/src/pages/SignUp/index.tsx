import React from 'react'
import { FiLogIn, FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi'
import { Background, Container, Content } from './styles'
import logoImg from '../../assets/LogoGobarber.svg'
import Input from '../../Components/input'
import Button from '../../Components/button'

const SignUp: React.FC = () => {
    return (
        <Container>
            <Background />
            <Content>
                <img src={logoImg} alt="GoBarber" />
                <form>
                    <h1>Faça seu Cadastro</h1>
                    <Input
                        icon={FiUser}
                        name="nome"
                        type="text"
                        placeholder="Nome"
                    />
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
                    <Button type="submit">Cadastrar</Button>
                </form>

                <a href="#teste">
                    <FiArrowLeft />
                    Voltar para o Login
                </a>
            </Content>
        </Container>
    )
}

export default SignUp
