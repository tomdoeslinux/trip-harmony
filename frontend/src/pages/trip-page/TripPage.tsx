import { Box, Grid, GridItem, Heading } from '@chakra-ui/react'
import { _Trip, _Location } from '../../trip'
import { useEffect, useState } from 'react'
import { API, Trip, Location } from 'src/api'
import TripDayComponent from 'src/pages/trip-page/components/TripDay'
import Map from 'src/pages/trip-page/components/Map'

interface TripPageProps {
    tripId: number
}

export default function TripPage(props: TripPageProps) {
    const [trip, setTrip] = useState<Trip | null>(null)

    useEffect(() => {
        async function fetchTrip() {
            const trip: Trip = await API.getTripById(props.tripId)
            setTrip(trip)
        }

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
                {trip && trip.tripDays.map((tripDay, index) => (
                    <TripDayComponent
                        key={index}
                        tripDay={tripDay}
                        onDeleteLocation={(locationId: string) => {
                            // trip.deleteLocationById(locationId)
                            // setItinerary([...trip.itinerary])
                        }}
                        onAddLocation={(location: Location) => {
                            // trip.addLocationToDay(tripDay.date, location)
                            // setItinerary([...trip.itinerary])
                        }}
                    />
                ))}
            </GridItem>

            <GridItem position='relative' gridColumn={2} background='gray'>
                <Box position='fixed' width='100%' height='100%'>
                    {trip && <Map startingLocation={trip.destination} locations={trip.tripDays.map((tripDay) => tripDay.locations).flat()} />}
                </Box>
            </GridItem>
        </Grid>
    )
}
