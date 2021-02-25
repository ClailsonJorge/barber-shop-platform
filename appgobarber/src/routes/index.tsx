import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SignIn from '../pages/signin'
import SignUp from '../pages/signup'

const Auth = createStackNavigator()

const Route: React.FC = () => {
    return (
        <Auth.Navigator
         screenOptions={{
             headerShown: false,
             cardStyle: {backgroundColor: '#312e38'}
         }}
         initialRouteName="signin"
        >
            <Auth.Screen name="signin" component={SignIn} />
            <Auth.Screen name="signup" component={SignUp} />
        </Auth.Navigator>
    )
}

export default Route
