import styled from 'styled-components/native'

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;

    padding: 0px 24px;
`

export const Title = styled.Text`
    font-family: 'RobotoSlab-Medium';
    font-size: 24px;
    line-height: 30px;
    color: #F4EDE8;
    margin: 64px 0 24px;
`

export const ForgotPassword = styled.TouchableOpacity`
    margin-top: 24px;
`

export const ForgotPasswordText = styled.Text`
    font-family: 'RobotoSlab-Regular';
    color: #f4ede8;
    font-size: 16px;
    line-height: 18px;
`

interface CreateAccountProps {
    keyboard: boolean
}

export const CreateAccount = styled.TouchableOpacity<CreateAccountProps>`
    position: absolute;
    bottom: 0;
    left: 0;

    flex-direction: row;
    width: 100%;
    height: 54px;
    border-top-width: ${({keyboard}) => keyboard ? '0' : '1'}px;
    border-top-color: #232129;

    justify-content: center;
    align-items: center;
`

export const CreateAccountText = styled.Text`
    font-family: 'RobotoSlab-Regular';
    font-size: 16px;
    color: #ff9000;
    line-height: 18px;
    margin-left: 18px;
`
