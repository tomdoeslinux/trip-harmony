import { Button, Text, IconButton, Input, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverTrigger } from "@chakra-ui/react"
import { useState } from "react"
import { MdDeleteOutline, MdEdit, MdMoreVert } from "react-icons/md"
import {API, Trip, UpdateTrip} from "src/api"
import UpdateTripDialog from "src/pages/home-page/components/UpdateTripDialog.tsx"
import {useMutation, useQueryClient} from "@tanstack/react-query";

interface TripCardOptionsProps {
    trip: Trip
}

export default function TripCardOptions(props: TripCardOptionsProps) {
    const [showEditTripDialog, setShowEditTripDialog] = useState(false)
    const queryClient = useQueryClient()

    const deleteTripMutation = useMutation({
        mutationFn: () => API.deleteTrip(props.trip.id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['trips'] })
    })

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
                            deleteTripMutation.mutate()
                        }}
                    >Delete</Button>
                </PopoverBody>
            </PopoverContent>

            {showEditTripDialog && (
                <UpdateTripDialog
                    trip={props.trip} 
                    onClose={() => setShowEditTripDialog(false)}
                />
            )}
        </Popover>
    )
}