import React, { useEffect, useState, useCallback, useRef } from 'react'
import * as Yup from 'yup'
import { Image, ScrollView, KeyboardAvoidingView, Platform, Keyboard, TextInput, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'
import Icon from 'react-native-vector-icons/Feather'
import logo from '../../assets/logo.png'
import Button from '../../components/button'
import Input from '../../components/input'

import { Container, Title, CreateAccount, CreateAccountText } from './styles'
import getValidationErrors from '../../utils/getValidationErrors'


interface SignUpData {
    name: string
    email: string
    password: string
}
const SignIn: React.FC = () => {
    const [keyboard, setKeyboard] = useState(false)
    const formRef = useRef<FormHandles>(null)
    const emailInputRef = useRef<TextInput>(null)
    const passwordInputRef = useRef<TextInput>(null)
    const navigation = useNavigation()

    const handleKeyBoardShow = useCallback(() => {
        setKeyboard(true);
    }, [keyboard])

    const handleKeyBoardHide = useCallback(() => {
        setKeyboard(false);
    }, [keyboard])

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

                // await api.post('/users', data)
                // history.push('/')
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    formRef.current?.setErrors(getValidationErrors(err))
                    return
                }
                Alert.alert('Ocorreu um Error', 'Erro ao tentar cadastrar Usuário, tente Novamente')
            }
        },
        []
    )

    useEffect(()=>{
        Keyboard.addListener('keyboardDidShow', handleKeyBoardShow)
        Keyboard.addListener('keyboardDidHide', handleKeyBoardHide)

        return () => {
            Keyboard.removeListener('keyboardWillShow', handleKeyBoardShow)
            Keyboard.removeListener('keyboardDidHide', handleKeyBoardHide)
        }
    },[])

    return (
        <>
            <KeyboardAvoidingView style={{flex: 1,}} behavior={Platform.OS === 'ios' ? 'padding' : undefined} enabled>
                <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{flex: 1,}}>
                    <Container>
                        <Image source={logo} />
                        <Title>Crie sua conta</Title>
                        <Form ref={formRef} onSubmit={handleSubmit}>
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
                                passwordInputRef.current?.focus()
                            }}
                            />
                            <Input
                             ref={passwordInputRef}
                             name="password"
                             icon="lock"
                             placeholder="Senha"
                             secureTextEntry
                             returnKeyType="send"
                             textContentType="newPassword"
                             onSubmitEditing={() => {
                                formRef.current?.submitForm()
                            }}
                            />
                            <Button
                             onPress={() => {formRef.current?.submitForm()}}>
                                 Cadastrar
                            </Button>
                        </Form>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>

            {!keyboard && <CreateAccount keyboard={keyboard} onPress={() => navigation.goBack()}>
                <Icon name="arrow-left" size={20} color="#fff"/>
                <CreateAccountText>Voltar para o login</CreateAccountText>
            </CreateAccount>}
        </>
    )
}

export default SignIn

