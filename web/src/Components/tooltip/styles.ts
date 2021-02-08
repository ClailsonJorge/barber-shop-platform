import styled from 'styled-components'

export const Container = styled.div`
    background: transparent;
    position: relative;
    cursor: help;

    span {
        min-width: 150px;
        background: #ff9000;
        color: #f4ede8;
        border-radius: 8px;
        padding: 4px;

        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: calc(100% + 12px);
        visibility: hidden;
        opacity: 0;
        transition: opacity 0.4s;

        &::before {
            content: '';
            top: 100%;
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
            border-top: 6px solid #ff9000;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
        }
    }

    &:hover span {
        visibility: visible;
        opacity: 1;
    }
`
