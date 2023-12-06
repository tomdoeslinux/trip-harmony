import { Grid, GridItem, } from '@chakra-ui/react'
import { useMemo, useState } from 'react'
import { Trip, Location } from '../../trip'
import TripDayComponent from './components/TripDay'
import Map from './components/Map'

function createTrip(): Trip {
    const currentDate = new Date()
    const endDate = new Date()
    endDate.setDate(currentDate.getDate() + 3)

    return new Trip(currentDate, endDate)
}

export default function TripPage() {
    const trip: Trip = useMemo(() => createTrip(), [])
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

            <GridItem gridColumn={2} background='gray'>
                <Map locations={itinerary.map((itinerary) => itinerary.locations).flat()} />
            </GridItem>
        </Grid>
    )
}
