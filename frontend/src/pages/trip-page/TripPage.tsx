import { Box, Flex, Text, Grid, GridItem, Heading, Spinner } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { MdLocationPin } from 'react-icons/md'
import { API, Trip } from 'src/api'
import DayItem from 'src/pages/trip-page/components/DayItem'
import Map from 'src/pages/trip-page/components/Map'

interface TripHeaderProps {
    trip: Trip
}

function TripHeader(props: TripHeaderProps) {
    const imgPath = API.getImgPath(props.trip.photo)

    return (
        <Flex
            width='100%'
            backgroundImage={imgPath}
            backgroundSize='cover'
            height='400px'
        >
            <Flex
                width='100%'
                padding='32px'
                background='linear-gradient(to bottom, transparent 50%, black 100%)'
            >
                <Flex
                    marginTop='auto'
                    color='white'
                    flexDirection='column'
                    gap='8px'
                >
                    <Flex gap='8px' alignItems='center'>
                        <MdLocationPin />
                        <Text>{props.trip.destination.name}</Text>
                    </Flex>
                    <Heading marginTop='auto' as='h1'>{props.trip.name}</Heading>
                </Flex>
            </Flex>
        </Flex>
    )
}

function TripLoading() {
    return (
        <Flex width='100vw' height='100vh' alignItems='center' justifyContent='center'>
            <Spinner />
        </Flex>
    )
}

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
