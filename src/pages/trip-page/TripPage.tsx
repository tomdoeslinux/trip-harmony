import { Box, Grid, GridItem, Heading, } from '@chakra-ui/react'
import { useMemo, useState } from 'react'
import { Trip, Location, TripCtor } from '../../trip'
import TripDayComponent from './components/TripDay'
import Map from './components/Map'
import { TripDB } from 'src/database'

interface TripPageProps {
    tripId: string
}

export default function TripPage(props: TripPageProps) {
    const trip: Trip = useMemo(() => TripDB.trips.find((trip) => trip.id === props.tripId)!, [])
    const [itinerary, setItinerary] = useState(trip.itinerary)

    return (
        <Grid templateColumns='repeat(2, 1fr)' width='100%' height='100vh'>
            <GridItem
                gridColumn={1}
                padding='32px'
                gap='8px'
                display='flex'
                flexDirection='column'
            >
                <Heading as='h1'>{trip.name}</Heading>
                {itinerary.map((tripDay, index) => (
                    <TripDayComponent
                        key={index}
                        tripDay={tripDay}
                        onDeleteLocation={(locationId: string) => {
                            trip.deleteLocationById(locationId)
                            setItinerary([...trip.itinerary])
                        }}
                        onAddLocation={(location: Location) => {
                            trip.addLocationToDay(tripDay.date, location)
                            setItinerary([...trip.itinerary])
                        }}
                    />
                ))}
            </GridItem>

            <GridItem position='relative' gridColumn={2} background='gray'>
                <Box position='fixed' width='100%' height='100%'>
                    <Map startingLocation={trip.location} locations={itinerary.map((itinerary) => itinerary.locations).flat()} />
                </Box>
            </GridItem>
        </Grid>
    )
}
