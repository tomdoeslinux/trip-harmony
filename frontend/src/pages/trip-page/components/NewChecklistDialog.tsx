import { FormControl, FormLabel, Input } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { Checklist } from "src/api"
import SimpleFormModal from "src/ui/SimpleFormModal"

interface NewNoteDialogProps {
    onClose: () => void
    onCreateChecklist: (checklist: Checklist) => void
}

export default function NewChecklistDialog(props: NewNoteDialogProps) {
    const { register, handleSubmit } = useForm<Checklist>()

    return (
        <SimpleFormModal header='New Checklist' onClose={props.onClose} onFormSubmit={handleSubmit(props.onCreateChecklist)}>
            <FormControl>
                <FormLabel>Name</FormLabel>
                <Input {...register('name')} />
            </FormControl>
        </SimpleFormModal>
    )
}