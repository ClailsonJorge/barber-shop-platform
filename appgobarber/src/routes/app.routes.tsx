import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Dashboard from '../pages/dashboard'
import Profile from '../pages/Profile'
import CreateAppointment from '../pages/CreateAppointment'
import AppointmentCreated from '../pages/AppointmentCreated'

const App = createStackNavigator()

const AppRoute: React.FC = () => {
    return (
        <App.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: '#312e38' }
            }}
        >
            <App.Screen name="dashboard" component={Dashboard} />
            <App.Screen
                name="CreateAppointment"
                component={CreateAppointment}
            />
            <App.Screen
                name="AppointmentCreated"
                component={AppointmentCreated}
            />

            <App.Screen name="Profile" component={Profile} />
        </App.Navigator>
    )
}

export default AppRoute
