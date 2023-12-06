import { Box, Button, Flex, Grid, Heading, useMediaQuery } from "@chakra-ui/react";
import { useState } from "react";
import { MdAdd } from "react-icons/md";
import { TripDB } from "src/database";
import NewTripDialog from "src/pages/home-page/components/NewTripDialog";
import TripCard from "src/pages/home-page/components/TripCard";
import { TripCtor } from "src/trip";
import { useLocation } from "wouter";

function Header() {
    return (
        <Flex
            background='white'
            width='100%'
            height={HEADER_HEIGHT}
            justifyContent='center'
            alignItems='center'
            position='fixed'
            shadow='md'
        >
            <Box width={PAGE_WIDTH} paddingLeft='32px' fontSize='2xl'>
                TripHarmony
            </Box>
        </Flex>
    )
}

const HEADER_HEIGHT = '70px'
const PAGE_WIDTH = '1280px'

export default function HomePage() {
    const [isWide] = useMediaQuery(`(min-width: ${PAGE_WIDTH}))`)
    const [showNewTripDialog, setShowNewTripDialog] = useState(false)
    const [_, setLocation] = useLocation()

    function createTrip(tripCtor: TripCtor) {
        setShowNewTripDialog(false)
        TripDB.addTrip(tripCtor)
        setLocation(`/trip/${TripDB.trips[TripDB.trips.length - 1].id}`)
    }

    return (
        <Flex
            flexDirection='column' 
            background='gray.100' 
            alignItems='center'
            overflowY='hidden'
            minHeight='100vh'
        >
            <Header />

            <Flex 
                flexDirection='column'
                paddingTop={`calc(${HEADER_HEIGHT} + 32px)`}
                paddingBottom='32px'
                paddingLeft='32px'
                paddingRight='32px'
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
                    {TripDB.trips.map((trip, index) => (
                        <TripCard 
                            trip={trip} 
                            key={index} 
                            onClick={(tripId) => setLocation(`/trip/${tripId}`)}
                        />
                    ))}
                </Grid>
            </Flex>

            {showNewTripDialog && <NewTripDialog onClose={() => setShowNewTripDialog(false)} onCreateTrip={createTrip} />}
        </Flex>
    )
}