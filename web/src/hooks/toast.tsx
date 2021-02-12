import React, { createContext, useCallback, useContext, useState } from 'react'
import { v4 as uuid } from 'uuid'
import ToastComponent from '../Components/toast-container'

interface ToastParams {
    addToast(params: Omit<MessageToastParams, 'id'>): void
    removeToast(id: string): void
}
const ToastContext = createContext({} as ToastParams)

export interface MessageToastParams {
    id: string
    type?: 'success' | 'info' | 'error'
    title: string
    description?: string
}

export const ToastProvider: React.FC = ({ children }) => {
    const [message, setMessage] = useState<MessageToastParams[]>([])

    const addToast = useCallback((params: Omit<MessageToastParams, 'id'>) => {
        const id = uuid()

        const newMessage = {
            id,
            type: params.type,
            title: params.title,
            description: params.description
        }

        setMessage(state => [...state, newMessage])
    }, [])

    const removeToast = useCallback((id: string) => {
        setMessage(state =>
            state.filter(toastMessage => toastMessage.id !== id)
        )
    }, [])

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            <ToastComponent message={message} />
        </ToastContext.Provider>
    )
}

export const useToast = (): ToastParams => {
    const context = useContext(ToastContext)

    if (!context) {
        throw new Error('usetoast must be used within ToastProvider.')
    }

    return context
}
