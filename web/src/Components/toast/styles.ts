import styled, { css } from 'styled-components'

interface ToastProps {
    type?: 'sucess' | 'info' | 'error'
    hasDescription: boolean
}

export const Container = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    padding: 30px;
    overflow: hidden;
`
const toastStyles = {
    error: css`
        background: #fddede;
        color: #c53030;
    `,
    sucess: css`
        background: #e6fffa;
        color: #2e656a;
    `,
    info: css`
        background: #ebf8ff;
        color: #3172b7;
    `
}
export const Toast = styled.div<ToastProps>`
    width: 360px;
    display: flex;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
    position: relative;

    & + div {
        margin-top: 8px;
    }

    ${({ type }) => toastStyles[type || 'info']}

    > svg {
        margin: 2px 8px 0 0;
    }

    div {
        flex: 1;
        strong {
            font-size: 18px;
            font-weight: bold;
        }

        p {
            font-size: 16px;
            font-weight: 100;
            opacity: 0.7;
            line-height: 20px;
        }
    }

    button {
        position: absolute;
        top: 20px;
        right: 16px;
        background: transparent;
        border: none;
        color: inherit;
    }

    ${({ hasDescription }) =>
        !hasDescription &&
        css`
            align-items: center;

            svg {
                margin-top: 0;
            }
        `}
`
