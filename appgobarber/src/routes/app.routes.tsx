import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Dashboard from '../pages/dashboard'

const App = createStackNavigator()

const AppRoute: React.FC = () => {
    return (
        <App.Navigator
         screenOptions={{
             headerShown: false,
             cardStyle: {backgroundColor: '#312e38'}
         }}
        >
            <App.Screen name="dashboard" component={Dashboard} />
        </App.Navigator>
    )
}

export default AppRoute