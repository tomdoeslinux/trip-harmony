import { Flex, IconButton, Box, Button, Text, Card } from "@chakra-ui/react"
import { MdAccessTime, MdDelete, MdLocationPin, MdSyncLock } from 'react-icons/md'
import { API, Activity } from "src/api"
import EditActivityTimes from "src/pages/trip-page/components/EditActivityTimes"

interface ActivityCardProps {
    activity: Activity
}

export default function ActivityCard(props: ActivityCardProps) {
    return (
        <Card
            padding='8px'
            flexDirection='row'
            alignItems='center'
            gap='8px'
            height='80px'
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
                    onClick={async () => await API.deleteActivity(props.activity.id)}
                >
                    <MdDelete />
                </IconButton>
            </Flex>

        </Card>
    )
}