import { Flex, IconButton, Box } from "@chakra-ui/react"
import { MdDelete, MdLocationPin } from 'react-icons/md'
import { Location } from '../../../trip'

interface LocationComponentProps {
    location: Location
    onDeleteLocation: (locationId: string) => void
}

export default function LocationComponent(props: LocationComponentProps) {
    return (
        <Flex
            alignItems='center'
            gap='8px'
            padding='8px'
            shadow='md'
        >
            <Box background='#A7C7E7' padding='12px' borderRadius='999px' color='darkblue'>
                <MdLocationPin size={18} />
            </Box>

            {props.location.name}

            <IconButton
                marginLeft='auto'
                aria-label='Delete'
                variant='ghost'
                onClick={() => props.onDeleteLocation(props.location.id)}
            >
                <MdDelete />
            </IconButton>
        </Flex>
    )
}