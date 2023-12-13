import { Box, Flex, Text, Grid, GridItem, Heading } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { MdCalendarMonth, MdLocationPin } from 'react-icons/md'
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
                gap='8px'
                display='flex'
                flexDirection='column'
            >
                {trip && (
                    <>
                        <Flex 
                            width='100%' 
                            backgroundImage={API.getImgPath(trip.photo)} 
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
                                        <Text>{trip.destination.name}</Text>
                                    </Flex>
                                    <Heading marginTop='auto' as='h1'>{trip.name}</Heading>          
                                </Flex>
                            </Flex>
                        </Flex>

                        <Flex padding='24px' flexDirection='column' gap='8px'>
                            {trip.days.map((day, index) => (
                                <DayItem key={index} day={day} />
                            ))}
                        </Flex>
                    </>
                )}
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
