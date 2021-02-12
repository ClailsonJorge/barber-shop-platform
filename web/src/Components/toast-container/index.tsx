import React from 'react'
import { MessageToastParams } from '../../hooks/toast'
import { Container } from './styles'
import Toast from './toast'

interface ToastContainerParams {
    message: MessageToastParams[]
}

const ToastCompanent: React.FC<ToastContainerParams> = ({ message }) => {
    return (
        <Container>
            {!!message.length &&
                message.map(toastMessage => (
                    <Toast key={toastMessage.id} message={toastMessage} />
                ))}
        </Container>
    )
}

export default ToastCompanent
