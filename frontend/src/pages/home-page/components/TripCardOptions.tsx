import { Button, Text, IconButton, Input, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverTrigger } from "@chakra-ui/react"
import { useState } from "react"
import { MdDeleteOutline, MdEdit, MdMoreVert } from "react-icons/md"
import { API, Trip } from "src/api"
import EditTripDialog from "src/pages/home-page/components/EditTripDialog"

interface TripCardOptionsProps {
    trip: Trip
}

export default function TripCardOptions(props: TripCardOptionsProps) {
    const [showEditTripDialog, setShowEditTripDialog] = useState(false)

    return (
        <Popover>
            <PopoverTrigger>
                <IconButton
                    variant='ghost'
                    borderRadius='999px'
                    marginLeft='auto'
                    aria-label='Delete trip'
                    onClick={(e) => e.stopPropagation()}
                    size='sm'
                >
                    <MdMoreVert size={20} />
                </IconButton>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverBody padding='0px' display='flex' flexDirection='column'>
                    <Button

                        variant='ghost'
                        leftIcon={<MdEdit />} 
                        onClick={(e) => {
                            e.stopPropagation()
                            setShowEditTripDialog(true)
                        }}
                    >Edit</Button>
                    <Button 
                        variant='ghost' 
                        leftIcon={<MdDeleteOutline />} 
                        onClick={async (e) => {
                            e.stopPropagation()
                            await API.deleteTrip(props.trip.id)
                        }}
                    >Delete</Button>
                </PopoverBody>
            </PopoverContent>

            {showEditTripDialog && (
                <EditTripDialog 
                    trip={props.trip} 
                    onClose={() => setShowEditTripDialog(false)} 
                    onEditTrip={async (editTrip) => {
                        await API.updateTrip(props.trip.id, editTrip)
                        setShowEditTripDialog(false)
                    }} 
                />
            )}
        </Popover>
    )
}