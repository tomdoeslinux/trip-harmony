import { Popover, PopoverTrigger, Text, Input, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverBody, IconButton, Button, useStatStyles } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdAccessTime } from "react-icons/md";
import { API, Activity } from "src/api";

type ActivityTimes = Pick<Activity, 'startTime' | 'endTime'>

interface EditActivityTimesProps {
    activity: Activity
}

export default function EditActivityTimes(props: EditActivityTimesProps) {
    const [isOpen, setIsOpen] = useState(false)
    const { register, handleSubmit } = useForm<Pick<Activity, 'startTime' | 'endTime'>>({ 
        defaultValues: { startTime: props.activity.startTime, endTime: props.activity.endTime } 
    })

    function submitHandler(times: ActivityTimes) {
        API.updateActivityTimes(props.activity.id, times.startTime!, times.endTime!)
        setIsOpen(false)
    }

    return (
        <Popover 
            isOpen={isOpen}
            onOpen={() => setIsOpen(true)}
            onClose={() => setIsOpen(false)}
        >
            <PopoverTrigger>
                <IconButton aria-label='Set times' variant='ghost'>
                    <MdAccessTime />
                </IconButton>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody as='form' onSubmit={handleSubmit(submitHandler)}>
                    <Text marginTop='16px'>Start Time:</Text>
                    <Input type='time' {...register('startTime', { required: true })} />

                    <Text marginTop='16px'>End Time:</Text>
                    <Input type='time' {...register('endTime', { required: true })} />

                    <Button marginTop='16px' type='submit'>Update Times</Button>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}