import { Modal, Text, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Input, ModalFooter, Button } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { TripCtor } from "src/trip"
import AddLocation from "src/ui/AddLocation"

interface NewTripDialogProps {
    onClose: () => void
    onCreateTrip: (tripCtor: TripCtor) => void
}

export default function NewTripDialog(props: NewTripDialogProps) {
    const { register, setValue, watch } = useForm<TripCtor>()

    function createTripHandler() {
        // setValue('id', (TripDB.trips.length + 1).toString())
        props.onCreateTrip(watch())
    }

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
                    <AddLocation onAddLocation={(location) => setValue('location', location)} placeholder='' />

                    <Text marginTop='16px'>Start Date:</Text>
                    <Input type='date' {...register('startDate', { valueAsDate: true })} />

                    <Text marginTop='16px'>End Date:</Text>
                    <Input type='date' {...register('endDate', { valueAsDate: true })} />
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' onClick={createTripHandler}>
                        Done
                    </Button>

                    <Button variant='ghost' onClick={props.onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}