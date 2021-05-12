import React, { useCallback, useRef } from 'react'
import {
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    TextInput,
    Alert
} from 'react-native'
import { launchCamera } from 'react-native-image-picker'
import * as Yup from 'yup'
import { useNavigation } from '@react-navigation/native'
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'

import Icon from 'react-native-vector-icons/Feather'
import Button from '../../components/button'
import Input from '../../components/input'
import getValidationErrors from '../../utils/getValidationErrors'
import api from '../../services/api'

import {
    Container,
    BackButton,
    Title,
    UserAvatarButton,
    UserAvatar
} from './styles'
import { useAuth } from '../../hooks/auth'

interface ProfileData {
    name: string
    email: string
    password: string
    old_password: string
    password_confirmation: string
}

const Profile: React.FC = () => {
    const { user, updateUser } = useAuth()
    const formRef = useRef<FormHandles>(null)
    const emailInputRef = useRef<TextInput>(null)
    const OldPasswordInputRef = useRef<TextInput>(null)
    const passwordInputRef = useRef<TextInput>(null)
    const confirmPasswordInputRef = useRef<TextInput>(null)
    const navigation = useNavigation()

    const handleGoBack = useCallback(() => {
        navigation.goBack()
    }, [navigation])

    const handleUpdateAvatar = useCallback(() => {
        launchCamera(
            {
                mediaType: 'photo',
                cameraType: 'front',
                saveToPhotos: true
            },
            response => {
                if (response.didCancel) {
                    return
                }

                if (response.errorMessage) {
                    Alert.alert(response.errorMessage)
                    return
                }

                const data = new FormData()

                data.append('avatar', {
                    type: 'image/jpeg',
                    name: `${user.id}.jpg`,
                    uri: response.uri
                })

                api.patch('/users/avatar', data).then(responseApi => {
                    updateUser(responseApi.data)
                })
            }
        )
    }, [user.id, updateUser])

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
                        is: (val: any) => val.length,
                        then: Yup.string().required('Campo obrigatório'),
                        otherwise: Yup.string()
                    }),
                    password_confirmation: Yup.string()
                        .when('old_password', {
                            is: (val: any) => !!val.length,
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

                updateUser(response.data)

                Alert.alert('Perfil atualizado com sucesso')

                navigation.goBack()
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    formRef.current?.setErrors(getValidationErrors(err))
                    return
                }
                Alert.alert(
                    'Ocorreu um Error',
                    'Erro ao tentar Atualizar seu Perfil, tente Novamente'
                )
            }
        },
        [navigation, updateUser]
    )

    return (
        <>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                enabled
            >
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ flex: 1 }}
                >
                    <Container>
                        <BackButton onPress={handleGoBack}>
                            <Icon
                                name="chevron-left"
                                size={24}
                                color="#999591"
                            />
                        </BackButton>

                        <UserAvatarButton onPress={handleGoBack}>
                            <UserAvatar source={{ uri: user.avatar_url }} />
                        </UserAvatarButton>

                        <Title>Meu perfil</Title>

                        <Form
                            ref={formRef}
                            onSubmit={handleSubmit}
                            initialData={user}
                        >
                            <Input
                                name="name"
                                icon="user"
                                placeholder="Nome"
                                autoCapitalize="words"
                                autoCorrect={false}
                                autoFocus
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                    emailInputRef.current?.focus()
                                }}
                            />
                            <Input
                                ref={emailInputRef}
                                name="email"
                                icon="mail"
                                placeholder="E-mail"
                                autoCapitalize="none"
                                keyboardType="email-address"
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                    OldPasswordInputRef.current?.focus()
                                }}
                            />
                            <Input
                                containerStyle={{ marginTop: 16 }}
                                ref={OldPasswordInputRef}
                                name="old_password"
                                icon="lock"
                                placeholder="Senha atual"
                                secureTextEntry
                                returnKeyType="next"
                                textContentType="newPassword"
                                onSubmitEditing={() => {
                                    passwordInputRef.current?.focus()
                                }}
                            />
                            <Input
                                ref={passwordInputRef}
                                name="password"
                                icon="lock"
                                placeholder="Nova senha"
                                secureTextEntry
                                returnKeyType="next"
                                textContentType="newPassword"
                                onSubmitEditing={() => {
                                    confirmPasswordInputRef.current?.focus()
                                }}
                            />
                            <Input
                                ref={confirmPasswordInputRef}
                                name="password_confirmation"
                                icon="lock"
                                placeholder="Confirmar senha"
                                secureTextEntry
                                returnKeyType="send"
                                textContentType="newPassword"
                                onSubmitEditing={() => {
                                    formRef.current?.submitForm()
                                }}
                            />
                            <Button
                                onPress={() => {
                                    formRef.current?.submitForm()
                                }}
                            >
                                Confirmar Mudança
                            </Button>
                        </Form>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>
        </>
    )
}

export default Profile
