import React from 'react'
import { useTransition } from 'react-spring'
import { MessageToastParams } from '../../hooks/toast'
import { Container } from './styles'
import Toast from './toast'

interface ToastContainerParams {
    message: MessageToastParams[]
}

const ToastCompanent: React.FC<ToastContainerParams> = ({ message }) => {
    const messageWithAnimatedToast = useTransition(message, msg => msg.id, {
        from: { right: '-120%' },
        enter: { right: '0%' },
        leave: { right: '-120%' }
    })

    return (
        <Container>
            {!!messageWithAnimatedToast.length &&
                messageWithAnimatedToast.map(({ item, key, props }) => (
                    <Toast key={key} message={item} style={props} />
                ))}
        </Container>
    )
}

export default ToastCompanent
