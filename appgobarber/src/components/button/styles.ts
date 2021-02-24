import styled from 'styled-components/native'
import { RectButton } from 'react-native-gesture-handler'

export const Container = styled(RectButton)`
    width: 100%;
    height: 60px;
    background: #FF9000;

    justify-content: center;
    align-items: center;
    border-radius: 8px;
    margin-top: 16px;
`

export const ButtonText = styled.Text`
    color: #fff;
    font-family: 'RobotoSlab-Medium';
    font-size: 20px;
`
