import React, { createContext, useCallback, useContext } from 'react'
import ToastCompanent from '../Components/toast'

interface ToastParams {
    addToast(): void
    removeToast(): void
}
const ToastContext = createContext({} as ToastParams)

export const ToastProvider: React.FC = ({ children }) => {
    const addToast = useCallback(() => {
        console.log('addToast')
    }, [])

    const removeToast = useCallback(() => {
        console.log('removeToast')
    }, [])

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            <ToastCompanent />
        </ToastContext.Provider>
    )
}

export const useToast = (): ToastParams => {
    const context = useContext(ToastContext)

    if (!context) {
        throw new Error('useToast must be used within ToastProvider.')
    }

    return context
}
