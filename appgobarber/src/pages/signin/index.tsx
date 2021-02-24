import React, { useCallback, useEffect, useState } from 'react'
import { Image, ScrollView, KeyboardAvoidingView, Platform, Keyboard, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import logo from '../../assets/logo.png'
import Button from '../../components/button'
import Input from '../../components/input'

import { Container, Title, ForgotPassword, ForgotPasswordText, CreateAccount, CreateAccountText } from './styles'

const SignIn: React.FC = () => {
    const [keyboard, setKeyboard] = useState(false)

    const handleKeyBoardShow = () => {
        setKeyboard(true);
    }

    const handleKeyBoardHide = () => {
        setKeyboard(false);
    }

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
            <KeyboardAvoidingView style={{flex: 1,}} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{flex: 1,}}>
                    <Container>
                        <Image source={logo} />
                        <Title>Faça seu Login</Title>
                        <Input name="email" icon="mail" placeholder="E-mail"/>
                        <Input name="password" icon="lock" placeholder="Senha"/>
                        <Button>Entrar</Button>

                        <ForgotPassword>
                            <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
                        </ForgotPassword>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>

            <CreateAccount keyboard={keyboard}>
                <Icon name="log-in" size={20} color="#ff9000"/>
                <CreateAccountText>Criar contar</CreateAccountText>
            </CreateAccount>
        </>
    )
}

export default SignIn
