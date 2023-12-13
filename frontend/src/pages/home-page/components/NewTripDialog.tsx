import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Input, ModalFooter, Button, FormControl, FormLabel } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { NewTrip } from "src/api"
import DestinationInput from "src/ui/DestinationInput"
import SimpleFormModal from "src/ui/SimpleFormModal"

interface NewTripDialogProps {
    onClose: () => void
    onCreateTrip: (trip: NewTrip) => void
}

export default function NewTripDialog(props: NewTripDialogProps) {
    const { register, handleSubmit, setValue } = useForm<NewTrip>()

    return (
        <SimpleFormModal header='New Trip' onClose={props.onClose} onFormSubmit={handleSubmit(props.onCreateTrip)}>
            <FormControl>
                <FormLabel>Name</FormLabel>
                <Input {...register('name')} />
            </FormControl>

            <FormControl>
                <FormLabel>Upload Photo</FormLabel>
                <Input type='file' accept='image/png, image/jpeg' {...register('file')} />
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