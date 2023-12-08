import { Box, Button, Flex, Grid, Heading, useMediaQuery } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import { TripDB } from "src/database";
import Header from "src/pages/home-page/components/Header";
import NewTripDialog from "src/pages/home-page/components/NewTripDialog";
import TripCard from "src/pages/home-page/components/TripCard";
import { User } from "src/pages/register-page/RegisterPage";
import { TripCtor } from "src/trip";
import { useLocation } from "wouter";

export interface Trip {
    id: number
    name: string
    startDate: string
    endDate: string
}

export const HEADER_HEIGHT = '70px'
export const PAGE_WIDTH = '1280px'

export default function HomePage() {
    const [isWide] = useMediaQuery(`(min-width: ${PAGE_WIDTH}))`)
    const [showNewTripDialog, setShowNewTripDialog] = useState(false)
    const [_, setLocation] = useLocation()
    const [user, setUser] = useState<User | null>(null)
    const [trips, setTrips] = useState<Trip[]>([])

    async function getTrips(userId: number): Promise<Trip[]> {
        const response = await fetch(`http://localhost:8080/api/users/${userId}/trips`)
        const trips: Trip[] = await response.json()

        return trips
    }

    useEffect(() => {
        async function init() {
            if (localStorage.getItem('cur_user')) {
                const user = JSON.parse(localStorage.getItem('cur_user')!) as User
                setUser(user)

                const trips: Trip[] = await getTrips(user.id);
                setTrips(trips)
            } else {
                setLocation('/register')
            }
        }

        init()
    }, [])

    function createTrip(tripCtor: TripCtor) {
        setShowNewTripDialog(false)
        TripDB.addTrip(tripCtor)
        setLocation(`/trip/${TripDB.trips[TripDB.trips.length - 1].id}`)
    }

    return (
        <>
            {user && (
                <Flex
                    flexDirection='column'
                    background='gray.100'
                    alignItems='center'
                    overflowY='hidden'
                    minHeight='100vh'
                >
                    <Header user={user} />

                    <Flex justifyContent='center' width='100%' height='100%'>
                        <Flex
                            flexDirection='column'
                            paddingTop={`calc(${HEADER_HEIGHT} + 32px)`}
                            paddingBottom='32px'
                            marginLeft='32px'
                            marginRight='32px'
                            gap='16px'
                            width={isWide ? PAGE_WIDTH : '100%'}
                            maxWidth={PAGE_WIDTH}
                        >
                            <Flex alignItems='center'>
                                <Heading as='h1' fontSize='lg'>Your Trips</Heading>
                                <Button
                                    marginLeft='auto'
                                    colorScheme='blue'
                                    fontFamily='Plus Jakarta Sans'
                                    size='sm'
                                    iconSpacing='6px'
                                    leftIcon={<MdAdd size={20} />}
                                    onClick={() => setShowNewTripDialog(true)}
                                >Add New</Button>
                            </Flex>

                            <Grid width='100%' gridTemplateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }} gap='8px'>
                                {trips.map((trip, index) => (
                                    <TripCard
                                        trip={trip}
                                        key={index}
                                        onClick={(tripId) => setLocation(`/trips/${tripId}`)}
                                    />
                                ))}
                            </Grid>
                        </Flex>
                    </Flex>

                    {showNewTripDialog && <NewTripDialog onClose={() => setShowNewTripDialog(false)} onCreateTrip={createTrip} />}
                </Flex>
            )}
        </>
    )
}