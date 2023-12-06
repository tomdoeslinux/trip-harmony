import { Box, Button, Flex, Grid, Heading, useMediaQuery } from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";
import { Trip } from "src/trip";

interface TripCardProps {
    trip?: Trip
}

function TripCard(props: TripCardProps) {
    return (
        <Flex 
            borderRadius='8px' 
            flexDirection='column' 
            background='white' 
            minHeight='300px'
            border='1px solid rgb(218, 220, 224)'
            _hover={{ shadow: 'md' }}
            cursor='pointer'
            transition='box-shadow 0.1s'
            minWidth='0px'
            _active={{ border: '1px solid darkblue' }}
        >
            <Box marginTop='auto' fontSize='lg' padding='16px'>
                Trip Name
            </Box>
        </Flex>
    )
}

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

    return (
        <Flex
            flexDirection='column' 
            background='gray.100' 
            alignItems='center'
            overflowY='hidden'
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
                    >Add New</Button>
                </Flex>

                <Grid width='100%' gridTemplateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }} gap='8px'>
                    {[...Array(21)].map((_, index) => (
                        <TripCard key={index} />
                    ))}
                </Grid>
            </Flex>
        </Flex>
    )
}