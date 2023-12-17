import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Note } from "src/api";
import SimpleFormModal from "src/ui/SimpleFormModal";

interface NewNoteDialogProps {
    onClose: () => void
    onCreateNote: (note: Note) => void
}

export default function NewNoteDialog(props: NewNoteDialogProps) {
    const { register, handleSubmit } = useForm<Note>()

    return (
        <SimpleFormModal header='New Note' onClose={props.onClose} onFormSubmit={handleSubmit(props.onCreateNote)}>
            <FormControl>
                <FormLabel>Text</FormLabel>
                <Input {...register('text')} />
            </FormControl>
        </SimpleFormModal>
    )
}