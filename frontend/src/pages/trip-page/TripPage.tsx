import { Box, Flex, Text, Grid, GridItem } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { API, Trip } from 'src/api'
import DayItem from 'src/pages/trip-page/components/DayItem'
import Map from 'src/pages/trip-page/components/Map'
import TripHeader from 'src/pages/trip-page/components/TripHeader'
import TripLoading from 'src/pages/trip-page/components/TripLoading'

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
        <>
            {!trip && <TripLoading />}

            {trip && (
                <Grid templateColumns='repeat(2, 1fr)' width='100%' height='100vh'>
                    {trip && (
                        <>
                            <GridItem
                                gridColumn={1}
                                gap='8px'
                                display='flex'
                                flexDirection='column'
                            >
                                <TripHeader trip={trip} />

                                <Flex padding='24px' flexDirection='column' gap='8px'>
                                    {trip.days.map((day, index) => (
                                        <DayItem key={index} day={day} />
                                    ))}
                                </Flex>
                            </GridItem>

                            <GridItem position='relative' gridColumn={2} background='gray'>
                                <Map 
                                    startingLocation={trip.destination} 
                                    destinations={trip.days.map((tripDay) => tripDay.activities.map((activity) => activity.destination)).flat()} 
                                />
                            </GridItem>
                        </>
                    )}
                </Grid>
            )}
        </>
    )
}
