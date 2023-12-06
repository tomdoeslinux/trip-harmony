import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { Route } from 'wouter'
import TripPage from 'src/pages/trip-page/TripPage.tsx'
import { Trip, TripCtor } from 'src/trip.tsx'

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
            <Route path='/trip/:id'>
                {params => <TripPage tripId={params.id} />}
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
