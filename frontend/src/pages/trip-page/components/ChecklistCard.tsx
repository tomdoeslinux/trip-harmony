import { Card, Checkbox, Flex, IconButton, Text } from "@chakra-ui/react"
import { MdAdd, MdChecklist, MdStickyNote2 } from "react-icons/md"
import { API, Checklist } from "src/api"

interface ChecklistCardProps {
    checklist: Checklist
}

export default function ChecklistCard(props: ChecklistCardProps) {
    return (
        <Card padding='8px'>
            <Flex alignItems='center' gap='4px'>
                <MdChecklist />
                <Text fontWeight='bold'>Checklist</Text>

                <IconButton marginLeft='auto' aria-label='...' variant='ghost' onClick={() => API.addChecklistItem(props.checklist.id, { id: 0, name: 'Hi', isChecked: false })}>
                    <MdAdd />
                </IconButton>
            </Flex>

            {props.checklist.name}

            {props.checklist.items.map((item) => (
                <Flex key={item.id}>
                    <Checkbox defaultChecked={item.isChecked} onChange={(e) => API.updateChecklistItem(item.id, { isChecked: e.target.checked })} />
                    <Text>{item.id} {item.name} ({`${item.isChecked}`})</Text>
                </Flex>
            ))}
        </Card>
    )
}