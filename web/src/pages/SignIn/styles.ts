import styled from 'styled-components'
import { shade } from 'polished'
import imgBackground from '../../assets/gobarber-background.svg'

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

        input {
            display: block;
            width: 100%;
            background: #232129;
            border-radius: 8px;
            height: 56px;
            border: none;
            color: #f4ede8;
            padding-left: 18px;

            &::placeholder {
                color: #666360;
            }
            & + input {
                margin-top: 8px;
            }
        }

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
        a {
            color: #f4ede8;
            text-decoration: none;
            transition: color 0.2s;
            &:hover {
                color: ${shade(0.2, '#f4ede8')};
            }
        }
    }
    > a {
        margin-top: 80px;
        color: #ff9000;
        text-decoration: none;
        display: flex;
        align-items: center;
        transition: color 0.2s;

        &:hover {
            color: ${shade(0.2, '#ff9000')};
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
