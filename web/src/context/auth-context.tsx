import React, { createContext, useCallback, useContext, useState } from 'react'
import api from '../services/api-client'

interface AuthData {
    token: string
    user: object
}

interface SignInProps {
    email: string
    password: string
}

interface AuthParams {
    user: object
    signIn(credentials: SignInProps): Promise<void>
}

const AuthContext = createContext<AuthParams>({} as AuthParams)

export const AuthProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<AuthData>(() => {
        const token = localStorage.getItem('@GoBarber/token')
        const user = localStorage.getItem('@GoBarber/user')

        if (token && user) {
            return {
                token,
                user: JSON.parse(user)
            }
        }

        return {} as AuthData
    })
    const signIn = useCallback(async ({ email, password }) => {
        const response = await api.post('sessions', {
            email,
            password
        })

        const { token, user } = response.data

        localStorage.setItem('@GoBarber/token', token)
        localStorage.setItem('@GoBarber/user', JSON.stringify(user))
        setData({ token, user })
    }, [])

    return (
        <AuthContext.Provider value={{ user: data.user, signIn }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthParams => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useContext must be used within an AuthProvider.')
    }

    return context
}
