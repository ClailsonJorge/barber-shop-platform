import React, { createContext, useCallback } from 'react'
import api from '../services/api-client'

interface SignInProps {
    email: string
    password: string
}

interface AuthParams {
    name: string
    signIn(credentials: SignInProps): Promise<void>
}

export const AuthContext = createContext<AuthParams>({} as AuthParams)

export const AuthProvider: React.FC = ({ children }) => {
    const signIn = useCallback(async ({ email, password }) => {
        const response = await api.post('sessions', {
            email,
            password
        })
        console.log(response.data)
    }, [])

    return (
        <AuthContext.Provider value={{ name: 'Clailson Jorge', signIn }}>
            {children}
        </AuthContext.Provider>
    )
}
