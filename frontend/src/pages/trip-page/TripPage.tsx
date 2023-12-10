import { Box, Grid, GridItem, Heading } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { API, Trip } from 'src/api'
import DayItem from 'src/pages/trip-page/components/DayItem'
import Map from 'src/pages/trip-page/components/Map'

interface TripPageProps {
    tripId: number
}

export default function TripPage(props: TripPageProps) {
    const [trip, setTrip] = useState<Trip | null>(null)

    async function fetchTrip() {
        const trip: Trip = await API.getTripById(props.tripId)
        setTrip(trip)
    }

    useEffect(() => {
        fetchTrip()
    }, [])

    return (
        <Grid templateColumns='repeat(2, 1fr)' width='100%' height='100vh'>
            <GridItem
                gridColumn={1}
                padding='32px'
                gap='8px'
                display='flex'
                flexDirection='column'
            >
                {trip && <Heading as='h1'>{trip.name}</Heading>}
                {trip && trip.days.map((day, index) => (
                    <DayItem key={index} day={day} />
                ))}
            </GridItem>

            <GridItem position='relative' gridColumn={2} background='gray'>
                <Box position='fixed' width='100%' height='100%'>
                    {trip && (
                        <Map 
                            startingLocation={trip.destination} 
                            destinations={trip.days.map((tripDay) => tripDay.activities.map((activity) => activity.destination)).flat()} 
                        />
                    )}
                </Box>
            </GridItem>
        </Grid>
    )
}
