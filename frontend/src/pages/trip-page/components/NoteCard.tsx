import { Card, Flex, Text } from "@chakra-ui/react";
import { MdNote, MdStickyNote2 } from "react-icons/md";
import { Note } from "src/api";

interface NoteCardProps {
    note: Note
}

export default function NoteCard(props: NoteCardProps) {
    return (
        <Card padding='8px'>
            <Flex alignItems='center' gap='4px'>
                <MdStickyNote2 />
                <Text fontWeight='bold'>Note</Text>
            </Flex>

            {props.note.text}
        </Card>
    )
}