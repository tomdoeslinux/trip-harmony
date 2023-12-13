import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, Button } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

interface SimpleFormModalProps extends PropsWithChildren {
    header: string
    onClose: () => void
    onFormSubmit: () => void
}

export default function SimpleFormModal(props: SimpleFormModalProps) {
    return (
        <Modal isOpen={true} onClose={props.onClose} isCentered={true}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{props.header}</ModalHeader>
                <ModalCloseButton />

                <form onSubmit={props.onFormSubmit}>
                    <ModalBody>
                        {props.children}
                    </ModalBody>

                    <ModalFooter>
                        <Button type='submit' colorScheme='blue'>
                            Done
                        </Button>

                        <Button variant='ghost' onClick={props.onClose}>Cancel</Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    )
}