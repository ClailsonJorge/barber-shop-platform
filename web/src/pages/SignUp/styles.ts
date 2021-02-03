import styled from 'styled-components'
import { shade } from 'polished'
import imgBackground from '../../assets/gobarber-background2.svg'

export const Container = styled.div`
    display: flex;
    justify-content: stretch;

    height: 100vh;
    width: 100%;
`

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 700px;

    form {
        margin-top: 80px;
        width: 400px;
        text-align: center;

        h1 {
            margin-bottom: 24px;
        }
    }
    > a {
        margin-top: 80px;
        color: #f4ede8;
        text-decoration: none;
        display: flex;
        align-items: center;
        transition: color 0.2s;

        &:hover {
            color: ${shade(0.2, '#f4ede8')};
        }

        svg {
            margin-right: 18px;
        }
    }
`

export const Background = styled.div`
    flex: 1;
    background: url(${imgBackground}) no-repeat;
    background-size: cover;
`
