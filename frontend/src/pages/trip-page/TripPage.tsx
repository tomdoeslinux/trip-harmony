import { Box, Grid, GridItem, Heading } from '@chakra-ui/react'
import { _Trip, _Location } from '../../trip'
import { useEffect, useState } from 'react'
import { API, Trip, Location, TripDay } from 'src/api'
import TripDayComponent from 'src/pages/trip-page/components/TripDay'
import Map from 'src/pages/trip-page/components/Map'

interface TripPageProps {
    tripId: number
}

export default function TripPage(props: TripPageProps) {
    const [trip, setTrip] = useState<Trip | null>(null)

    console.log(trip)

    async function fetchTrip() {
        const trip: Trip = await API.getTripById(props.tripId)
        setTrip(trip)
    }

    async function addLocationHandler(tripDayId: number, location: Location) {
        await API.addLocationToTripDay(tripDayId, location)
        await fetchTrip()
    }

    async function deleteLocationHandler(tripDayLocationId: number) {
        await API.deleteLocationFromTripDay(tripDayLocationId)
        await fetchTrip()
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
                {trip && trip.tripDays.map((tripDay, index) => (
                    <TripDayComponent
                        key={index}
                        tripDay={tripDay}
                        onDeleteLocation={(location) => deleteLocationHandler(location.id)}
                        onAddLocation={(location) => addLocationHandler(tripDay.id, location)}
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
