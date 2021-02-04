import styled from 'styled-components'

interface ContainerProps {
    focus: boolean
    filled: boolean
}

export const Container = styled.div<ContainerProps>`
    display: flex;
    align-items: center;
    width: 100%;
    background: #232129;
    border-radius: 8px;
    height: 56px;
    border: 2px solid ${({ focus }) => (focus ? '#ff9000' : 'transparent')};

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
