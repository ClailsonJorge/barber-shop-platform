import React, { useCallback, useRef } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { FiLock } from 'react-icons/fi'
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

interface ResetPasswordParams {
    password: string
    password_confirmation: string
}

const ResetPassword: React.FC = () => {
    const location = useLocation()
    const history = useHistory()
    const { addToast } = useToast()
    const formRef = useRef<FormHandles>(null)

    const handleSubmit = useCallback(
        async (data: ResetPasswordParams) => {
            try {
                formRef.current?.setErrors({})

                const schema = Yup.object().shape({
                    password: Yup.string().required('Password is necessary.'),
                    password_confirmation: Yup.string().oneOf(
                        [Yup.ref('password'), undefined],
                        'Confirmação senha incorreta'
                    )
                })

                await schema.validate(data, {
                    abortEarly: false
                })

                const { password, password_confirmation } = data
                const token = location.search.replace('?token=', '')

                await api.post('password/reset', {
                    password,
                    password_confirmation,
                    token
                })

                history.push('/')
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    formRef.current?.setErrors(getValidationErrors(err))
                    return
                }

                addToast({
                    type: 'error',
                    title: 'Erro ao resetar senha',
                    description: 'Ocorreu um erro ao resetar a senha.'
                })
            }
        },
        [addToast, history, location.search]
    )

    return (
        <Container>
            <Content>
                <img src={logoImg} alt="GoBarber" />
                <Form ref={formRef} onSubmit={handleSubmit}>
                    <h1>Resetar Senha</h1>
                    <Input
                        icon={FiLock}
                        name="password"
                        type="password"
                        placeholder="Nova Senha"
                    />

                    <Input
                        icon={FiLock}
                        name="password_confirmation"
                        type="password"
                        placeholder="Confirmação da senha"
                    />

                    <Button type="submit">Alterar senha</Button>
                </Form>
            </Content>
            <Background />
        </Container>
    )
}

export default ResetPassword
