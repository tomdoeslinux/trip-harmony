import { Modal, ModalOverlay, ModalContent, Text, ModalHeader, ModalCloseButton, ModalBody, Input, ModalFooter, Button } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { Activity } from "src/api"
import DestinationInput from "src/ui/DestinationInput"

interface NewActivityDialogProps {
    onClose: () => void
    onCreateActivity: (activity: Activity) => void
}

export default function NewActivityDialog(props: NewActivityDialogProps) {
    const { register, setValue, getValues } = useForm<Activity>()

    return (
        <Modal isOpen={true} onClose={props.onClose} isCentered={true}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>New Activity</ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                    <Text>Name:</Text>
                    <Input {...register('name')} />

                    <Text marginTop='16px'>Destination:</Text>
                    <DestinationInput onAddLocation={(destination) => setValue('destination', destination)} placeholder='' />

                    <Text marginTop='16px'>Start Time:</Text>
                    <Input type='time' {...register('startTime')} />

                    <Text marginTop='16px'>End Time:</Text>
                    <Input type='time' {...register('endTime')} />
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' onClick={() => props.onCreateActivity(getValues())}>
                        Done
                    </Button>

                    <Button variant='ghost' onClick={props.onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}