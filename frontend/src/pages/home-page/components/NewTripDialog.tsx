import { Modal, Text, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Input, ModalFooter, Button } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { Trip } from "src/api"
import AddLocation from "src/ui/AddLocation"

interface NewTripDialogProps {
    onClose: () => void
    onCreateTrip: (trip: Trip) => void
}

export default function NewTripDialog(props: NewTripDialogProps) {
    const { register, setValue, watch } = useForm<Trip>()

    return (
        <Modal isOpen={true} onClose={props.onClose} isCentered={true}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>New Trip</ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                    <Text>Name:</Text>
                    <Input {...register('name')} />

                    <Text marginTop='16px'>Location:</Text>
                    <AddLocation onAddLocation={(destination) => setValue('destination', destination)} placeholder='' />

                    <Text marginTop='16px'>Start Date:</Text>
                    <Input type='date' {...register('startDate')} />

                    <Text marginTop='16px'>End Date:</Text>
                    <Input type='date' {...register('endDate')} />
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' onClick={() => props.onCreateTrip(watch())}>
                        Done
                    </Button>

                    <Button variant='ghost' onClick={props.onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}