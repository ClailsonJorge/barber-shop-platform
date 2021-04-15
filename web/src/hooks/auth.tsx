import React, { createContext, useCallback, useContext, useState } from 'react'
import api from '../services/api-client'

interface User {
    id: string
    name: string
    avatar_url: string
}

interface AuthData {
    token: string
    user: User
}

interface SignInProps {
    email: string
    password: string
}

interface AuthParams {
    user: User
    signIn(credentials: SignInProps): Promise<void>
    signOut(): void
}

const AuthContext = createContext<AuthParams>({} as AuthParams)

export const AuthProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<AuthData>(() => {
        const token = localStorage.getItem('@GoBarber/token')
        const user = localStorage.getItem('@GoBarber/user')

        if (token && user) {
            api.defaults.headers.Authorization = `Bearer ${token}`

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

        api.defaults.headers.Authorization = `Bearer ${token}`

        setData({ token, user })
    }, [])

    const signOut = useCallback(() => {
        localStorage.removeItem('@GoBarber/token')
        localStorage.removeItem('@GoBarber/user')

        setData({} as AuthData)
    }, [])
    return (
        <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
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
