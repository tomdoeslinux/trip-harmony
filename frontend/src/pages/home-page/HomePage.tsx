import {Button, Flex, Grid, Heading} from "@chakra-ui/react";
import {useMemo, useState} from "react";
import {MdAdd} from "react-icons/md";
import {API, NewTrip, User} from "src/api";
import Header from "src/pages/home-page/components/Header";
import NewTripDialog from "src/pages/home-page/components/NewTripDialog";
import TripCard from "src/pages/home-page/components/TripCard";
import {useLocation} from "wouter";
import {useMutation, useQuery} from "@tanstack/react-query";

export const HEADER_HEIGHT = '70px'
export const PAGE_WIDTH = '1280px'

export default function HomePage() {
    const [showNewTripDialog, setShowNewTripDialog] = useState(false)
    const [, setLocation] = useLocation()

    // We can use `useMemo` as there are no async operations performed in factory
    const user: User | null = useMemo(() => {
        if (API.isLoggedIn()) {
            return API.getLoggedInUser()
        } else {
            setLocation('/register')
            return null
        }
    }, [])

    const { data: trips } = useQuery({
        queryKey: ['trips'],
        queryFn: () => API.getTrips(user!.id),
        enabled: user !== null
    })

    const createTripMutation = useMutation({
        mutationFn: (newTrip: NewTrip) => API.addTrip(user!.id, newTrip),
        onSuccess: (createdTrip) => setLocation(`/trips/${createdTrip.id}`)
    })

    async function createTrip(trip: NewTrip): Promise<void> {
        if (user) {
            setShowNewTripDialog(false)
            createTripMutation.mutate(trip)
        }
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
                            width={PAGE_WIDTH}
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

                            {trips && (
                                <Grid
                                    width='100%'
                                    gridTemplateColumns={{
                                        base: 'repeat(1, 1fr)',
                                        sm: 'repeat(2, 1fr)',
                                        md: 'repeat(3, 1fr)',
                                        lg: 'repeat(4, 1fr)'
                                    }}
                                    gap='8px'
                                >
                                    {trips.map((trip) => (
                                        <TripCard
                                            trip={trip}
                                            key={trip.id}
                                            onClick={(tripId) => setLocation(`/trips/${tripId}`)}
                                        />
                                    ))}
                                </Grid>
                            )}
                        </Flex>
                    </Flex>

                    {showNewTripDialog && <NewTripDialog onClose={() => setShowNewTripDialog(false)} onCreateTrip={createTrip} />}
                </Flex>
            )}
        </>
    )
}