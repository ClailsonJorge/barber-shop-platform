import React, { useEffect } from 'react'
import { FiAlertCircle, FiCheckCircle, FiInfo, FiXCircle } from 'react-icons/fi'
import { MessageToastParams, useToast } from '../../../hooks/toast'
import { Container } from './styles'

interface ToastParams {
    message: MessageToastParams
}

const icons = {
    error: <FiAlertCircle size={24} />,
    info: <FiInfo size={24} />,
    success: <FiCheckCircle size={24} />
}

const Toast: React.FC<ToastParams> = ({ message }) => {
    const { removeToast } = useToast()
    useEffect(() => {
        const timer = setTimeout(() => {
            removeToast(message.id)
        }, 3000)

        return () => {
            clearTimeout(timer)
        }
    }, [message.id, removeToast])
    return (
        <Container type={message.type} hasDescription={!!message.description}>
            {icons[message.type || 'info']}

            <div>
                <strong>{message.title}</strong>
                {!!message.description && <p>{message.description}</p>}
            </div>

            <button type="button" onClick={() => removeToast(message.id)}>
                <FiXCircle size={18} />
            </button>
        </Container>
    )
}

export default Toast
