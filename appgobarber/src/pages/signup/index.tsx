import React, { useEffect, useState } from 'react'
import { Image, ScrollView, KeyboardAvoidingView, Platform, Keyboard } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Feather'
import logo from '../../assets/logo.png'
import Button from '../../components/button'
import Input from '../../components/input'

import { Container, Title, CreateAccount, CreateAccountText } from './styles'

const SignIn: React.FC = () => {
    const [keyboard, setKeyboard] = useState(false)
    const navigation = useNavigation()

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
            <KeyboardAvoidingView style={{flex: 1,}} behavior={Platform.OS === 'ios' ? 'padding' : undefined} enabled>
                <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{flex: 1,}}>
                    <Container>
                        <Image source={logo} />
                        <Title>Crie sua conta</Title>
                        <Input name="name" icon="user" placeholder="Nome"/>
                        <Input name="email" icon="mail" placeholder="E-mail"/>
                        <Input name="password" icon="lock" placeholder="Senha"/>
                        <Button>Cadastrar</Button>
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

