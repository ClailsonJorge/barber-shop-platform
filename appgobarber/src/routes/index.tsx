import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import { useAuth } from '../hooks/auth'

import AuthRoute from './auth.routes'
import AppRoute from './app.routes'

const Route: React.FC = () => {
    const { user, loading } = useAuth()

    if(loading) {
        return (
            <View style={{height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large" color="#999"/>
            </View>
        )
    }
    return !user ? <AuthRoute /> : <AppRoute />
}

export default Route
