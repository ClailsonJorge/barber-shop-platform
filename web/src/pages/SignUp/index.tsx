import React from 'react'
import { Form } from '@unform/web'
import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi'
import { Background, Container, Content } from './styles'
import logoImg from '../../assets/LogoGobarber.svg'
import Input from '../../Components/input'
import Button from '../../Components/button'

const SignUp: React.FC = () => {
    const handleSubmit = (data: object): void => {
        console.log(data)
    }
    return (
        <Container>
            <Background />
            <Content>
                <img src={logoImg} alt="GoBarber" />
                <Form onSubmit={handleSubmit}>
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
                </Form>

                <a href="#teste">
                    <FiArrowLeft />
                    Voltar para o Login
                </a>
            </Content>
        </Container>
    )
}

export default SignUp
