import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ChakraProvider, createMultiStyleConfigHelpers, extendTheme } from '@chakra-ui/react'
import { Route } from 'wouter'
import TripPage from 'src/pages/trip-page/TripPage.tsx'
import RegisterPage from 'src/pages/register-page/RegisterPage.tsx'
import LoginPage from 'src/pages/login-page/LoginPage.tsx'
import { cardAnatomy } from '@chakra-ui/anatomy'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(cardAnatomy.keys)
    
const baseStyle = definePartsStyle({
    container: {
        borderRadius: '8px',
        cursor: 'pointer',
        _hover: { shadow: 'md' },
        _active: { border: '1px solid darkblue' },
        transition: 'box-shadow 0.1s',
        border: '1px solid rgb(218, 220, 224)',
        shadow: '',
        printColorAdjust: 'exact', // To ensure that the card image is printable 
        WebkitPrintColorAdjust: 'exact'
    },
    header: {
        marginTop: 'auto',
        background: 'white'
    }
})

const cardTheme = defineMultiStyleConfig({ baseStyle: baseStyle })

const theme = extendTheme({
    fonts: {
        body: 'Noto Sans, sans-serif',
        heading: 'Plus Jakarta Sans, sans-serif'
    }, 
    components: {
        Card: cardTheme
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
        <QueryClientProvider client={new QueryClient()}>
            <ChakraProvider theme={theme}>
                <Router />
            </ChakraProvider>
        </QueryClientProvider>
    </React.StrictMode>
)
