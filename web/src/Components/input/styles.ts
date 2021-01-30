import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    background: #232129;
    border-radius: 8px;
    height: 56px;
    border: none;

    & + div {
        margin-top: 8px;
    }
    input {
        color: #f4ede8;
        background: transparent;
        border: none;
        flex: 1;
        &::placeholder {
            color: #666360;
        }
    }

    svg {
        color: #f4ede8;
        margin: 0 16px;
    }
`
