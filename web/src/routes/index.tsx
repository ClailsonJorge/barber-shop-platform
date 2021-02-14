import React from 'react'
import { Switch } from 'react-router-dom'
import Dashboard from '../pages/dashboard'
import Route from './route'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'

const Routes: React.FC = () => {
    return (
        <Switch>
            <Route path="/" exact component={SignIn} />
            <Route path="/signup" component={SignUp} />

            <Route path="/dashboard" component={Dashboard} isPrivate />
        </Switch>
    )
}

export default Routes
