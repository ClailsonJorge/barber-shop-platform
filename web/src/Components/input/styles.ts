import styled from 'styled-components'
import Tooltip from '../tooltip'

interface ContainerProps {
    focus: boolean
    filled: boolean
    isErrored: boolean
}

export const Container = styled.div<ContainerProps>`
    display: flex;
    align-items: center;
    width: 100%;
    background: #232129;
    border-radius: 8px;
    height: 56px;
    border: 2px solid transparent;

    border-color: ${({ isErrored }) => isErrored && '#c53030'};
    border-color: ${({ focus }) => focus && '#ff9000'};

    & + div {
        margin-top: 8px;
    }

    input {
        background: transparent;
        border: none;
        flex: 1;
        color: ${({ focus }) => (focus ? '#ff9000' : '#f4ede8')};
        &::placeholder {
            color: #666360;
        }
    }

    svg {
        margin: 0 16px;
        color: ${({ focus, filled }) =>
            focus || filled ? '#ff9000' : '#f4ede8'};
    }
`
export const Error = styled(Tooltip)`
    span {
        width: 200px;
        background: #c53030;
        font-weight: 500;

        ::before {
            border-top-color: #c53030;
        }
    }

    svg {
        color: #c53030;
    }
`
