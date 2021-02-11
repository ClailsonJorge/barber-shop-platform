import React from 'react'
import GlobalStyle from './styles/global'
import { AuthProvider } from './hooks/auth-context'
import ToastCompanent from './Components/toast'
import SignIn from './pages/SignIn'

const App: React.FC = () => {
    return (
        <>
            <AuthProvider>
                <SignIn />
            </AuthProvider>
            <ToastCompanent />
            <GlobalStyle />
        </>
    )
}
export default App
