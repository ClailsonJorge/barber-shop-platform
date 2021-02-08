import React, { useCallback, useRef } from 'react'
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import { FormHandles } from '@unform/core'
import { Background, Container, Content } from './styles'
import logoImg from '../../assets/LogoGobarber.svg'
import Input from '../../Components/input'
import Button from '../../Components/button'
import getValidationErrors from '../../utils/getValidationErrors'

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null)
    const handleSubmit = useCallback(async (data: object) => {
        try {
            formRef.current?.setErrors({})
            const schema = Yup.object().shape({
                name: Yup.string().required('Name incorrect'),
                email: Yup.string()
                    .required('E-mail is necessary')
                    .email('The email format is not correct.'),
                password: Yup.string().required('Password is necessary.')
            })

            await schema.validate(data, {
                abortEarly: false
            })
        } catch (err) {
            formRef.current?.setErrors(getValidationErrors(err))
        }
    }, [])
    return (
        <Container>
            <Content>
                <img src={logoImg} alt="GoBarber" />
                <Form ref={formRef} onSubmit={handleSubmit}>
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
                </Form>

                <a href="#teste">
                    <FiLogIn />
                    Criar conta
                </a>
            </Content>
            <Background />
        </Container>
    )
}

export default SignIn
