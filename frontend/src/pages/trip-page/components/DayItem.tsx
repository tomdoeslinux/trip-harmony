import { Flex, Box, IconButton, Heading, Button } from "@chakra-ui/react"
import { useState } from "react"
import { MdArrowForwardIos } from "react-icons/md"
import ActivityCard from "./ActivityCard"
import { Day, API } from "src/api"
import NewActivityDialog from "src/pages/trip-page/components/NewActivityDialog"

interface DayItemProps {
    day: Day
}

export default function DayItem(props: DayItemProps) {
    const [isExpanded, setIsExpanded] = useState(false)
    const [showNewActivityDialog, setShowNewActivityDialog] = useState(false)

    return (
        <Flex flexDirection='column' gap='8px'>
            <Flex alignItems='center' gap='8px'>
                <IconButton
                    aria-label='Expand/Collapse'
                    variant='ghost'
                    onClick={() => setIsExpanded((prevIsExpanded) => !prevIsExpanded)}
                >
                    <Box transform={`rotate(${isExpanded ? 90 : 0}deg)`} transition='transform 0.05s'>
                        <MdArrowForwardIos />
                    </Box>
                </IconButton>

                <Heading as='h2' size='md'>{props.day.date}</Heading>

                <Button size='sm' variant='outline' onClick={() => setShowNewActivityDialog(true)}>Add Activity</Button>
            </Flex>

            {isExpanded && (
                <Flex flexDirection='column' gap='8px'>
                    {props.day.activities.map((activity, index) => (
                        <ActivityCard key={index} activity={activity} />
                    ))}
                </Flex>
            )}

            {showNewActivityDialog && (
                <NewActivityDialog 
                    onCreateActivity={async (activity) => {
                        await API.addActivity(props.day.id, activity)
                        setShowNewActivityDialog(false)
                    }} 
                    onClose={() => setShowNewActivityDialog(false)} 
                />
            )}
        </Flex>
    )
}