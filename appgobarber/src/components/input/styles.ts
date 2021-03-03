import styled from 'styled-components/native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { TextInput } from 'react-native'

export const Container = styled.View`
    width: 100%;
    height: 50px;

    background: #232129;
    border-radius: 12px;
    margin-bottom: 8px;
    flex-direction: row;

    justify-content: center;
    align-items: center;
`

export const InputText = styled(TextInput)`
    flex: 1;
    font-size: 20px;
    color: #fff;
`
export const Icon = styled(FeatherIcon)`
    margin: 0 18px;
`
