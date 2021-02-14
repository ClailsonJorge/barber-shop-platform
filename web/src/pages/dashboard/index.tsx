import React from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../hooks/auth'

const Dashboard: React.FC = () => {
    const history = useHistory()
    const { signOut } = useAuth()
    function handleLogout() {
        signOut()
        history.push('/')
    }

    return (
        <>
            <h1>Dashboard</h1>
            <button type="button" onClick={handleLogout}>
                Logout
            </button>
        </>
    )
}

export default Dashboard
