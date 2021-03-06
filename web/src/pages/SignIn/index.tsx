import React, { useCallback, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import { FormHandles } from '@unform/core'
import { Background, Container, Content } from './styles'
import { useAuth } from '../../hooks/auth'
import logoImg from '../../assets/LogoGobarber.svg'
import Input from '../../Components/input'
import Button from '../../Components/button'
import getValidationErrors from '../../utils/getValidationErrors'
import { useToast } from '../../hooks/toast'

interface HandleSubmitParams {
    email: string
    password: string
}

const SignIn: React.FC = () => {
    const history = useHistory()
    const { signIn } = useAuth()
    const { addToast } = useToast()
    const formRef = useRef<FormHandles>(null)

    const handleSubmit = useCallback(
        async (data: HandleSubmitParams) => {
            try {
                formRef.current?.setErrors({})
                const schema = Yup.object().shape({
                    email: Yup.string()
                        .required('E-mail is necessary')
                        .email('The email format is not correct.'),
                    password: Yup.string().required('Password is necessary.')
                })

                await schema.validate(data, {
                    abortEarly: false
                })

                await signIn(data)

                history.push('/dashboard')
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    formRef.current?.setErrors(getValidationErrors(err))
                    return
                }
                addToast({
                    type: 'error',
                    title: 'Ocorreu um Error',
                    description: 'teste toast de Erro'
                })
            }
        },
        [signIn, addToast, history]
    )
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
                    <Link to="/forgot-password">Esqueci minha senha</Link>
                </Form>

                <Link to="/signup">
                    <FiLogIn />
                    Criar conta
                </Link>
            </Content>
            <Background />
        </Container>
    )
}

export default SignIn
