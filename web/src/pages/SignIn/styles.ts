import styled, { keyframes } from 'styled-components'
import { shade } from 'polished'
import imgBackground from '../../assets/gobarber-background.svg'

const animationContent = keyframes`
    from {
        transform: translateX(-50px);
        opacity: 0;
    }

    to {
        transform: translateX(0);
        opacity: 1;
    }
`

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
    animation: ${animationContent} 1s;

    form {
        margin-top: 80px;
        width: 400px;
        text-align: center;

        h1 {
            margin-bottom: 24px;
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
