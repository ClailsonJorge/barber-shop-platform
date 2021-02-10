import React from 'react'
import GlobalStyle from './styles/global'
import { AuthProvider } from './hooks/auth-context'
import SignIn from './pages/SignIn'

const App: React.FC = () => {
    return (
        <>
            <AuthProvider>
                <SignIn />
            </AuthProvider>
            <GlobalStyle />
        </>
    )
}
export default App
