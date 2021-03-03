import React, { useEffect, useState, useCallback, useRef, forwardRef } from 'react'
import { Image, ScrollView, KeyboardAvoidingView, Platform, Keyboard, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'
import Icon from 'react-native-vector-icons/Feather'
import logo from '../../assets/logo.png'
import Button from '../../components/button'
import Input from '../../components/input';

import { Container, Title, ForgotPassword, ForgotPasswordText, CreateAccount, CreateAccountText } from './styles'

const SignIn: React.FC = () => {
    const [keyboard, setKeyboard] = useState(false)
    const formRef = useRef<FormHandles>(null)
    const navigation = useNavigation()
    const passwordInputRef = useRef<TextInput>(null)

    const handleKeyBoardShow = useCallback(() => {
        setKeyboard(true);
    }, [keyboard])

    const handleKeyBoardHide = useCallback(() => {
        setKeyboard(false);
    }, [keyboard])

    const handleSubmit = useCallback((data:object) => {
        console.log(data)
    }, [])

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
                        <Form ref={formRef} onSubmit={handleSubmit}>
                            <Input
                             keyboardType="email-address"
                             autoCapitalize="none"
                             autoFocus autoCorrect={false}
                             name="email" icon="mail"
                             placeholder="E-mail"
                             returnKeyType="next"
                             onSubmitEditing={()=>{
                                passwordInputRef.current?.focus()
                             }}
                            />
                            <Input
                             ref={passwordInputRef}
                             secureTextEntry
                             returnKeyType="send"
                             name="password" icon="lock"
                             placeholder="Senha"
                             onSubmitEditing={()=>{
                                formRef.current?.submitForm()
                            }}
                            />
                            <Button onPress={() => {formRef.current?.submitForm()}}>Entrar</Button>
                        </Form>
                        <ForgotPassword>
                            <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
                        </ForgotPassword>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>

            {!keyboard && <CreateAccount keyboard={keyboard} onPress={() => navigation.navigate('signup')}>
                <Icon name="log-in" size={20} color="#ff9000"/>
                <CreateAccountText>Criar contar</CreateAccountText>
            </CreateAccount>}
        </>
    )
}

export default SignIn
