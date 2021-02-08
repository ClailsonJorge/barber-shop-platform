import React from 'react'
import { Container } from './styles'

interface TooltipProps {
    text: string
}

const Tooltip: React.FC<TooltipProps> = ({ text, children, ...rest }) => {
    return (
        <Container {...rest}>
            {children}
            <span>{text}</span>
        </Container>
    )
}

export default Tooltip
