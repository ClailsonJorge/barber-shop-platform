import React from 'react'
import { TextInputProps } from 'react-native'

import {Container, InputText, Icon } from './styles'

interface InputProps extends TextInputProps {
    name: string
    icon: string
}

const Input: React.FC<InputProps> = ({ name, icon, ...rest }) => {
    return (
        <Container>
            <Icon name={icon} size={20} color="#666360" />
            <InputText  placeholderTextColor="#666360" {...rest}/>
        </Container>
    )
}

export default Input
