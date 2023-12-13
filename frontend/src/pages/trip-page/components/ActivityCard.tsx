import { Flex, IconButton, Box, Button, Text } from "@chakra-ui/react"
import { MdAccessTime, MdDelete, MdLocationPin, MdSyncLock } from 'react-icons/md'
import { API, Activity } from "src/api"
import EditActivityTimes from "src/pages/trip-page/components/EditActivityTimes"

interface ActivityCardProps {
    activity: Activity
}

export default function ActivityCard(props: ActivityCardProps) {
    return (
        <Flex
            alignItems='center'
            gap='8px'
            padding='8px'
            borderRadius='8px'
            height='80px'
            border='1px solid rgb(218, 220, 224)'
            _hover={{ shadow: 'md' }}
            cursor='pointer'
            _active={{ border: '1px solid darkblue' }}
        >
            <Box padding='12px' borderRadius='999px' background='lightblue' color='darkblue'>
                <MdLocationPin size={18} />
            </Box>

            <Flex flexDirection='column'>
                {props.activity.name}
                <Text fontWeight='bold' fontSize='12px'>{props.activity.destination.name}</Text>
            </Flex>

            <Flex marginLeft='auto' gap='8px' alignItems='center'>
                {(props.activity.startTime && props.activity.endTime) && (
                    <Text fontSize='small'>{props.activity.startTime} - {props.activity.endTime}</Text>
                )}

                <EditActivityTimes activity={props.activity} />

                <IconButton
                    aria-label='Delete'
                    variant='ghost'
                    onClick={() => API.deleteActivity(props.activity.id)}
                >
                    <MdDelete />
                </IconButton>
            </Flex>

        </Flex>
    )
}