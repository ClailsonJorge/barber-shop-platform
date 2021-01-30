import styled from 'styled-components'
import { shade } from 'polished'

export const Container = styled.div`
    button {
        border: none;
        width: 100%;
        height: 56px;
        background: #ff9000;
        color: #312e38;
        border-radius: 8px;
        margin: 24px 0;
        transition: background 0.3s;

        &:hover {
            background: ${shade(0.2, '#ff9000')};
        }
    }
`
