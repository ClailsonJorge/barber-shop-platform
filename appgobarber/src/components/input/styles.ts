import styled, {css} from 'styled-components/native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { TextInput } from 'react-native'

interface ContainerProps {
    isFocus: boolean
    isError: boolean
}

export const Container = styled.View<ContainerProps>`
    width: 100%;
    height: 50px;

    background: #232129;
    border-radius: 12px;
    margin-bottom: 8px;
    flex-direction: row;
    border-width: 2px;
    border-color: #232129;

    ${({ isError }) => isError && css`
        border-color: #c53030;`
    }

    ${({ isFocus }) => isFocus && css`
        border-color: #FF9000;`
    }

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
