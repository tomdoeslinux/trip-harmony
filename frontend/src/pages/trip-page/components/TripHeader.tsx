import { Flex, Heading, Text } from "@chakra-ui/react"
import { MdLocationPin } from "react-icons/md"
import { Trip, API } from "src/api"

interface TripHeaderProps {
    trip: Trip
}

export default function TripHeader(props: TripHeaderProps) {
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
