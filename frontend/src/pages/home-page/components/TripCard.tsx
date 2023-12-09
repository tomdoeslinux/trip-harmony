import { Flex, Box } from "@chakra-ui/react"
import { Trip } from "src/api"
import { _Trip } from "src/trip"

interface TripCardProps {
    trip: Trip
    onClick: (tripId: number) => void
}

export default function TripCard(props: TripCardProps) {
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
            onClick={() => props.onClick(props.trip.id)}
            _active={{ border: '1px solid darkblue' }}
        >
            <Box marginTop='auto' fontSize='lg' padding='16px'>
                {props.trip.name}
            </Box>
        </Flex>
    )
}
