import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { Route } from 'wouter'
import TripPage from 'src/pages/trip-page/TripPage.tsx'
import RegisterPage from 'src/pages/register-page/RegisterPage.tsx'
import LoginPage from 'src/pages/login-page/LoginPage.tsx'

const theme = extendTheme({
    fonts: {
        body: 'Noto Sans, sans-serif',
        heading: 'Plus Jakarta Sans, sans-serif'
    }
})


function Router() {
    return (
        <>
            <Route path='/' component={App} />
            <Route path='/login' component={LoginPage} />
            <Route path='/register' component={RegisterPage} />
            <Route path='/trips/:tripId'>
                {params => <TripPage tripId={parseInt(params.tripId)} />}
            </Route>
        </>
    )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <Router />
        </ChakraProvider>
    </React.StrictMode>
)
