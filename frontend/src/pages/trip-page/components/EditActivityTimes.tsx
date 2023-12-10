import { Popover, PopoverTrigger, Text, Input, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverBody, IconButton, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { MdAccessTime } from "react-icons/md";

interface EditActivityTimesProps {
    defaultStartTime?: string
    defaultEndTime?: string
    onUpdateTimes: (newStartTime: string, newEndTime: string) => void
}

export default function EditActivityTimes(props: EditActivityTimesProps) {
    const { register, getValues } = useForm<{ startTime?: string, endTime?: string }>({ 
        defaultValues: { startTime: props.defaultStartTime, endTime: props.defaultEndTime } 
    })

    return (
        <Popover>
            <PopoverTrigger>
                <IconButton aria-label='Set times' variant='ghost'>
                    <MdAccessTime />
                </IconButton>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                    <Text marginTop='16px'>Start Time:</Text>
                    <Input type='time' {...register('startTime')} />

                    <Text marginTop='16px'>End Time:</Text>
                    <Input type='time' {...register('endTime')} />

                    <Button marginTop='16px' onClick={() => props.onUpdateTimes(getValues().startTime!, getValues().endTime!)}>Update Times</Button>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}