import styled from 'styled-components'
import { shade } from 'polished'

export const Container = styled.div`
    width: 100%;

    > header {
        height: 144px;
        background: #28262e;

        display: flex;
        align-items: center;

        div {
            width: 100%;
            max-width: 1120px;
            margin: 0 auto;

            svg {
                width: 24px;
                height: 24px;
                color: #999199;
            }
        }
    }
`

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: -176px auto 0;

    form {
        display: flex;
        flex-direction: column;
        margin-top: 80px;
        width: 400px;
        text-align: center;

        h1 {
            font-size: 20px;
            text-align: left;
            margin-bottom: 24px;
        }
    }
`
export const AvatarInput = styled.div`
    margin-bottom: 32px;
    position: relative;
    align-self: center;

    img {
        height: 186px;
        width: 186px;
        border-radius: 50%;
    }

    label {
        position: absolute;
        width: 48px;
        height: 48px;
        background: #ff9000;
        border-radius: 50%;
        right: 0;
        bottom: 0;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: background 0.2s;

        &:hover {
            background: ${shade(0.2, '#ff9000')};
        }

        svg {
            width: 20px;
            height: 20px;
            color: #322e38;
        }

        input {
            display: none;
        }
    }
`
