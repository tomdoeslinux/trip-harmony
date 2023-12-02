import './App.css'
import { Grid, GridItem, Heading, Text } from '@chakra-ui/react'
import { Trip } from './trip'

function createTrip(): Trip {
    const currentDate = new Date()
    const endDate = new Date()
    endDate.setDate(currentDate.getDate() + 3)

    return new Trip('North Dakota', currentDate, endDate)
}

function App() {
    const trip = createTrip()

    return (
        <Grid templateColumns='repeat(2, 1fr)' width='100vw' height='100vh'>
            <GridItem 
                gridColumn={1} 
                padding={4} 
                gap={1} 
                display='flex' 
                flexDirection='column'
            >
                {trip.itinerary.map((tripDay, index) => (
                    <Heading as='h2' size='md' key={index}>{tripDay.date.toDateString()}</Heading>
                ))}
            </GridItem>

            <GridItem gridColumn={2}>

            </GridItem>
        </Grid>
    )
}

export default App
