import { Input, FormControl, FormLabel } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { Activity } from "src/api"
import DestinationInput from "src/ui/DestinationInput"
import SimpleFormModal from "src/ui/SimpleFormModal"

interface NewActivityDialogProps {
    onClose: () => void
    onCreateActivity: (activity: Activity) => void
}

export default function NewActivityDialog(props: NewActivityDialogProps) {
    const { register, setValue, handleSubmit } = useForm<Activity>()

    return (
        <SimpleFormModal header='New Activity' onClose={props.onClose} onFormSubmit={handleSubmit(props.onCreateActivity)}>
            <FormControl>
                <FormLabel>Name</FormLabel>
                <Input {...register('name')} />
            </FormControl>

            <FormControl>
                <FormLabel marginTop='16px'>Destination</FormLabel>
                <DestinationInput onAddLocation={(destination) => setValue('destination', destination)} placeholder='' />
            </FormControl>

            <FormControl>
                <FormLabel marginTop='16px'>Start Time</FormLabel>
                <Input type='time' {...register('startTime')} />
            </FormControl>

            <FormControl>
                <FormLabel marginTop='16px'>End Time</FormLabel>
                <Input type='time' {...register('endTime')} />
            </FormControl>
        </SimpleFormModal>
    )
}