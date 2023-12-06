import { Flex, Box, IconButton, Heading } from "@chakra-ui/react"
import { useState } from "react"
import { MdArrowForwardIos } from "react-icons/md"
import AddLocation from "./AddLocation"
import LocationComponent from "./LocationComponent"
import { Location, TripDay } from "src/trip"

interface TripDayComponentProps {
    tripDay: TripDay
    onAddLocation: (location: Location) => void
    onDeleteLocation: (locationId: string) => void
}

export default function TripDayComponent(props: TripDayComponentProps) {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <Flex flexDirection='column' gap='8px'>
            <Flex alignItems='center'>
                <IconButton
                    aria-label='Expand/Collapse'
                    variant='ghost'
                    onClick={() => setIsExpanded((prevIsExpanded) => !prevIsExpanded)}
                >
                    <Box transform={`rotate(${isExpanded ? 90 : 0}deg)`} transition='transform 0.05s'>
                        <MdArrowForwardIos />
                    </Box>
                </IconButton>

                <Heading as='h2' size='md'>{props.tripDay.date.toDateString()}</Heading>
            </Flex>

            {isExpanded && (
                <Flex flexDirection='column' gap='8px'>
                    <AddLocation onAddLocation={props.onAddLocation} />

                    {props.tripDay.locations.map((location, index) => (
                        <LocationComponent
                            key={index}
                            location={location}
                            onDeleteLocation={props.onDeleteLocation}
                        />
                    ))}
                </Flex>
            )}
        </Flex>
    )
}
