import React, { useCallback, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import * as Yup from 'yup'
import { Form } from '@unform/web'
import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi'
import { FormHandles } from '@unform/core'
import { Background, Container, Content } from './styles'
import logoImg from '../../assets/LogoGobarber.svg'
import Input from '../../Components/input'
import Button from '../../Components/button'
import getValidationErrors from '../../utils/getValidationErrors'
import api from '../../services/api-client'
import { useToast } from '../../hooks/toast'

interface SignUpData {
    name: string
    email: string
    password: string
}

const SignUp: React.FC = () => {
    const history = useHistory()
    const { addToast } = useToast()
    const formRef = useRef<FormHandles>(null)
    const handleSubmit = useCallback(
        async (data: SignUpData) => {
            try {
                formRef.current?.setErrors({})
                const schema = Yup.object().shape({
                    name: Yup.string().required('Name incorrect'),
                    email: Yup.string()
                        .required('E-mail is necessary')
                        .email('The email format is not correct.'),
                    password: Yup.string().min(
                        6,
                        'Is necessary at least 6 characters.'
                    )
                })

                await schema.validate(data, {
                    abortEarly: false
                })

                await api.post('/users', data)
                addToast({
                    type: 'success',
                    title: 'Cadastro Realizado com Sucesso!',
                    description: 'Já está pronto para realizar Login'
                })
                history.push('/')
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    formRef.current?.setErrors(getValidationErrors(err))
                    return
                }
                addToast({
                    type: 'error',
                    title: 'Ocorreu um Error',
                    description:
                        'Erro ao tentar cadastrar Usuário, tente Novamente'
                })
            }
        },
        [addToast, history]
    )

    return (
        <Container>
            <Background />
            <Content>
                <img src={logoImg} alt="GoBarber" />
                <Form ref={formRef} onSubmit={handleSubmit}>
                    <h1>Faça seu Cadastro</h1>
                    <Input
                        icon={FiUser}
                        name="name"
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

                <Link to="/">
                    <FiArrowLeft />
                    Voltar para o Login
                </Link>
            </Content>
        </Container>
    )
}

export default SignUp
