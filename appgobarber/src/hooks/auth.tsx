import React, { createContext, useCallback, useContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import api from '../services/api'

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
    signOut(): void
    loading: boolean
}

const AuthContext = createContext<AuthParams>({} as AuthParams)

export const AuthProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<AuthData>({} as AuthData)
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        async function loadStorage() {
            const token = await AsyncStorage.getItem('@GoBarber/token')
            const user = await AsyncStorage.getItem('@GoBarber/user')

            if (token && user) {
                setData({token, user: JSON.parse(user)})
                setLoading(true)
            }
        }
        loadStorage()
    }, [])

    const signIn = useCallback(async ({ email, password }) => {
        const response = await api.post('/sessions', {
            email,
            password
        })

        const { token, user } = response.data

        AsyncStorage.setItem('@GoBarber/token', token)
        AsyncStorage.setItem('@GoBarber/user', JSON.stringify(user))
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
