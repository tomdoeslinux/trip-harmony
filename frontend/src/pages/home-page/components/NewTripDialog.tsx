import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Input, ModalFooter, Button, FormControl, FormLabel } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { NewTrip } from "src/api"
import DestinationInput from "src/ui/DestinationInput"

interface NewTripDialogProps {
    onClose: () => void
    onCreateTrip: (trip: NewTrip) => void
}

export default function NewTripDialog(props: NewTripDialogProps) {
    const { register, handleSubmit, setValue } = useForm<NewTrip>()

    return (
        <Modal isOpen={true} onClose={props.onClose} isCentered={true}>
            <ModalOverlay />
            <ModalContent as='form' onSubmit={handleSubmit(props.onCreateTrip)}>
                <ModalHeader>New Trip</ModalHeader>
                <ModalCloseButton />

                <ModalBody>
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
                </ModalBody>

                <ModalFooter>
                    <Button type='submit' colorScheme='blue'>
                        Done
                    </Button>

                    <Button variant='ghost' onClick={props.onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}