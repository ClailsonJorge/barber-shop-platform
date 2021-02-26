import styled from 'styled-components/native'
import { RectButton } from 'react-native-gesture-handler'

export const Container = styled(RectButton)`
    height: 50px;
    background: #FF9000;

    justify-content: center;
    align-items: center;
    border-radius: 8px;
    margin-top: 16px;
`

export const ButtonText = styled.Text`
    color: #312E38;
    font-family: 'RobotoSlab-Medium';
    font-size: 18px;
`
