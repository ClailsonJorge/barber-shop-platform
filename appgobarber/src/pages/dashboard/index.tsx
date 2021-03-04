import React from 'react'
import { View } from 'react-native'
import Button from '../../components/button'
import { useAuth } from '../../hooks/auth'

const Dashboard: React.FC = () => {
    const { signOut } = useAuth()
    return (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Button onPress={signOut}>Sair</Button>
        </View>
    )
}

export default Dashboard
