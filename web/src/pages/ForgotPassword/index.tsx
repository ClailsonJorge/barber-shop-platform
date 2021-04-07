import React, { useCallback, useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn, FiMail } from 'react-icons/fi'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import { FormHandles } from '@unform/core'
import { Background, Container, Content } from './styles'
import logoImg from '../../assets/LogoGobarber.svg'
import Input from '../../Components/input'
import Button from '../../Components/button'
import getValidationErrors from '../../utils/getValidationErrors'
import { useToast } from '../../hooks/toast'
import api from '../../services/api-client'

interface ForgotPasswordData {
    email: string
}

const ForgotPassword: React.FC = () => {
    const [loading, setLoading] = useState(false)

    const history = useHistory()
    const { addToast } = useToast()
    const formRef = useRef<FormHandles>(null)

    const handleSubmit = useCallback(
        async (data: ForgotPasswordData) => {
            setLoading(true)

            try {
                formRef.current?.setErrors({})
                const schema = Yup.object().shape({
                    email: Yup.string()
                        .required('E-mail is necessary')
                        .email('The email format is not correct.')
                })

                await schema.validate(data, {
                    abortEarly: false
                })

                await api.post('http://172.27.1.93:3333/password/forgot', {
                    email: data.email
                })

                addToast({
                    type: 'success',
                    title: 'E-mail de recuperação enviado.',
                    description:
                        'Enviamos um e-mail de recuperação para sua caixa de mensagem.'
                })

                history.push('/dashboard')
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    formRef.current?.setErrors(getValidationErrors(err))
                    return
                }

                addToast({
                    type: 'error',
                    title: 'Ocorreu um Error na Recuperação.',
                    description: 'Erro ao tentar recuperar senha.'
                })
            } finally {
                setLoading(false)
            }
        },
        [addToast, history]
    )
    return (
        <Container>
            <Content>
                <img src={logoImg} alt="GoBarber" />
                <Form ref={formRef} onSubmit={handleSubmit}>
                    <h1>Recuperar senha</h1>
                    <Input
                        icon={FiMail}
                        name="email"
                        type="text"
                        placeholder="E-mail"
                    />
                    <Button loading={loading} type="submit">
                        Recuperar
                    </Button>
                </Form>

                <Link to="/">
                    <FiLogIn />
                    Voltar ao login
                </Link>
            </Content>
            <Background />
        </Container>
    )
}

export default ForgotPassword
