import React, { createContext, useCallback, useContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import api from '../services/api'
import useEffectAsync from '../utils/useEffectAsync'


interface User {
    id: string
    name: string
    email: string
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
    loading: boolean
}

const AuthContext = createContext<AuthParams>({} as AuthParams)

export const AuthProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<AuthData>({} as AuthData)
    const [loading, setLoading] = useState(false)

    async function loadStorage() {
        const [token, user] = await AsyncStorage.multiGet([
            '@GoBarber/token', '@GoBarber/user'
        ])

        if (token[1] && user[1]) {
            api.defaults.headers.authorization = `Bearer ${token[1]}`

            setData({ token: token[1], user: JSON.parse(user[1])})
            setLoading(true)
        }

        setLoading(false)
    }

    useEffectAsync(loadStorage, [])

    const signIn = useCallback(async ({ email, password }) => {
        const response = await api.post('/sessions', {
            email,
            password
        })

        const { token, user } = response.data

        AsyncStorage.setItem('@GoBarber/token', token)
        AsyncStorage.setItem('@GoBarber/user', JSON.stringify(user))

        api.defaults.headers.authorization = `Bearer ${token}`

        setData({ token, user })
    }, [])

    const signOut = useCallback(() => {
        AsyncStorage.removeItem('@GoBarber/token')
        AsyncStorage.removeItem('@GoBarber/user')

        setData({} as AuthData)
    }, [])

    return (
        <AuthContext.Provider value={{ user: data.user, signIn, signOut, loading }}>
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
