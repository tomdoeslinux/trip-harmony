import {FormControl, FormLabel, Input} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import {API, Trip, UpdateTrip} from "src/api";
import DestinationInput from "src/ui/DestinationInput";
import SimpleFormModal from "src/ui/SimpleFormModal";
import {useMutation, useQueryClient} from "@tanstack/react-query";

interface UpdateTripDialogProps {
    trip: Trip
    onClose: () => void
}

export default function UpdateTripDialog(props: UpdateTripDialogProps) {
    const { handleSubmit, setValue, register } = useForm<UpdateTrip>({
        defaultValues: props.trip
    })
    const queryClient = useQueryClient()

    const updateTripMutation = useMutation({
        mutationFn: (trip: UpdateTrip) => API.updateTrip(props.trip.id, trip),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['trips'] })
            props.onClose()
        }
    })

    function submitHandler(trip: UpdateTrip) {
        updateTripMutation.mutate(trip)
    }

    return (
        <SimpleFormModal header='Edit Trip' onClose={props.onClose} onFormSubmit={handleSubmit(submitHandler)}>
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