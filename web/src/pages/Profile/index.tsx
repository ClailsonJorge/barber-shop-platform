import React, { ChangeEvent, useCallback, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import * as Yup from 'yup'
import { Form } from '@unform/web'
import { FiMail, FiLock, FiUser, FiCamera, FiArrowLeft } from 'react-icons/fi'
import { FormHandles } from '@unform/core'
import Input from '../../Components/input'
import Button from '../../Components/button'
import getValidationErrors from '../../utils/getValidationErrors'
import api from '../../services/api-client'
import { useToast } from '../../hooks/toast'
import { useAuth } from '../../hooks/auth'
import { Container, Content, AvatarInput } from './styles'

interface ProfileData {
    name: string
    email: string
    old_password: string
    password: string
    password_confirmation: string
}

const Profile: React.FC = () => {
    const history = useHistory()
    const { user, updatedAvatar } = useAuth()
    const { addToast } = useToast()
    const formRef = useRef<FormHandles>(null)

    const handleSubmit = useCallback(
        async (data: ProfileData) => {
            try {
                formRef.current?.setErrors({})
                const schema = Yup.object().shape({
                    name: Yup.string().required('Name incorrect'),
                    email: Yup.string()
                        .required('E-mail is necessary')
                        .email('The email format is not correct.'),
                    old_password: Yup.string(),
                    password: Yup.string().when('old_password', {
                        is: val => val.length,
                        then: Yup.string().required('Campo obrigatório'),
                        otherwise: Yup.string()
                    }),
                    password_confirmation: Yup.string()
                        .when('old_password', {
                            is: val => !!val.length,
                            then: Yup.string().required('Campo obrigatório'),
                            otherwise: Yup.string()
                        })
                        .oneOf(
                            [Yup.ref('password'), undefined],
                            'Confirmação incorreta'
                        )
                })

                await schema.validate(data, {
                    abortEarly: false
                })

                const {
                    name,
                    email,
                    old_password,
                    password,
                    password_confirmation
                } = data

                const formData = {
                    name,
                    email,
                    ...(old_password
                        ? {
                              old_password,
                              password,
                              password_confirmation
                          }
                        : {})
                }

                const response = await api.put('/profile', formData)

                updatedAvatar(response.data)

                addToast({
                    type: 'success',
                    title: 'Perfil atualizado',
                    description: 'Suas informações foram atualizadas'
                })

                history.push('/dashboard')
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    formRef.current?.setErrors(getValidationErrors(err))
                    return
                }
                addToast({
                    type: 'error',
                    title: 'Ocorreu um Error',
                    description:
                        'Erro ao tentar atualizar Usuário, tente Novamente'
                })
            }
        },
        [addToast, history]
    )

    const handleAvatarChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.files) {
                const data = new FormData()

                data.append('avatar', e.target.files[0])

                api.patch('/users/avatar', data).then(response => {
                    updatedAvatar(response.data)

                    addToast({
                        type: 'success',
                        title: 'Avatar atualizado'
                    })
                })
            }
        },
        [addToast, updatedAvatar]
    )

    return (
        <Container>
            <header>
                <div>
                    <Link to="/dashboard">
                        <FiArrowLeft />
                    </Link>
                </div>
            </header>
            <Content>
                <Form
                    ref={formRef}
                    initialData={{
                        name: user.name,
                        email: user.email
                    }}
                    onSubmit={handleSubmit}
                >
                    <AvatarInput>
                        <img src={user.avatar_url} alt={user.name} />
                        <label htmlFor="avatar">
                            <FiCamera />
                            <input
                                type="file"
                                id="avatar"
                                onChange={handleAvatarChange}
                            />
                        </label>
                    </AvatarInput>

                    <h1>Meu perfil</h1>

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
                        containerStyle={{ marginTop: 24 }}
                        icon={FiLock}
                        name="old_password"
                        type="password"
                        placeholder="Senha antiga"
                    />
                    <Input
                        icon={FiLock}
                        name="password"
                        type="password"
                        placeholder="Nova senha"
                    />
                    <Input
                        icon={FiLock}
                        name="password_confirmation"
                        type="password"
                        placeholder="Confirmar senha"
                    />
                    <Button type="submit">Confirmar mudanças</Button>
                </Form>
            </Content>
        </Container>
    )
}

export default Profile
