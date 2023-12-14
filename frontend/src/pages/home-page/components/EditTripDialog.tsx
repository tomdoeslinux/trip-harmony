import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { EditTrip, NewTrip, Trip } from "src/api";
import DestinationInput from "src/ui/DestinationInput";
import SimpleFormModal from "src/ui/SimpleFormModal";

interface EditTripDialogProps {
    trip: Trip
    onClose: () => void
    onEditTrip: (trip: EditTrip) => void
}

export default function EditTripDialog(props: EditTripDialogProps) {
    const { handleSubmit, setValue, register } = useForm<EditTrip>({
        defaultValues: props.trip
    })

    return (
        <SimpleFormModal header='Edit Trip' onClose={props.onClose} onFormSubmit={handleSubmit(props.onEditTrip)}>
            <FormControl>
                <FormLabel>Name</FormLabel>
                <Input {...register('name')} />
            </FormControl>

            <FormControl>
                <FormLabel>Destination</FormLabel>
                <DestinationInput onAddLocation={(destination) => setValue('destination', destination)} placeholder='' />
            </FormControl>

            <FormControl>
                <FormLabel>Start Date</FormLabel>
                <Input type='date' {...register('startDate')} />
            </FormControl>

            <FormControl>
                <FormLabel>End Date</FormLabel>
                <Input type='date' {...register('endDate')} />
            </FormControl>
        </SimpleFormModal>
    )
}