import React, { useCallback, useRef } from 'react'
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

interface ForgotPasswordData {
    email: string
}

const ForgotPassword: React.FC = () => {
    const history = useHistory()
    const { addToast } = useToast()
    const formRef = useRef<FormHandles>(null)

    const handleSubmit = useCallback(
        async (data: ForgotPasswordData) => {
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
                    <Button type="submit">Recuperar</Button>
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
