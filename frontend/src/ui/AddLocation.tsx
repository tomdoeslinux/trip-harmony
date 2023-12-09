import { Flex, IconButton, InputProps } from "@chakra-ui/react"
import debounce from "lodash.debounce"
import { useState, useCallback, useEffect } from "react"
import { useForm } from "react-hook-form"
import { MdCheck } from "react-icons/md"
import { buildUrl, generateId } from "src/util"
import { _Location } from 'src/trip'
import Autocomplete from "src/ui/Autocomplete"

type AddLocationProps ={
    onAddLocation: (location: _Location) => void
    showDoneButton?: boolean
} & InputProps

export default function AddLocation({ onAddLocation, showDoneButton, ...props }: AddLocationProps) {
    const { register, watch, setValue } = useForm<{ locationSearchInput: string }>()
    const [suggestedLocations, setSuggestedLocations] = useState<_Location[]>([])
    const [isLoadingSuggestedLocations, setIsLoadingSuggestedLocations] = useState(false)
    const [selectedLocation, setSelectedLocation] = useState<_Location | null>(null)
    const locationSearchInput = watch('locationSearchInput')

    async function fetchSuggestedLocations(searchInput: string) {
        if (searchInput?.trim().length > 0) {
            setIsLoadingSuggestedLocations(true)

            const url: URL = buildUrl('https://nominatim.openstreetmap.org/search', { q: searchInput, format: 'json' })

            const response = await fetch(url, {
                headers: { 'User-Agent': 'todoescode@gmail.com' }
            })
            const data: any[] = await response.json()

            const locations: _Location[] = data.map((item) => ({
                id: generateId(),
                name: item.display_name,
                lat: Number(item.lat),
                lon: Number(item.lon)
            }))

            setSuggestedLocations(locations)
            setIsLoadingSuggestedLocations(false)
        }
    }

    const debouncedFetchSuggestedLocations = useCallback(debounce(fetchSuggestedLocations, 300), [])

    useEffect(() => {
        debouncedFetchSuggestedLocations(locationSearchInput)

        if (locationSearchInput?.trim().length === 0) {
            setSuggestedLocations([])
            debouncedFetchSuggestedLocations.cancel()
        }

        return () => {
            debouncedFetchSuggestedLocations.cancel()
        }
    }, [locationSearchInput])

    return (
        <Flex gap='8px'>
            <Autocomplete
                suggestions={suggestedLocations.map((location) => location.name)}
                onSuggestionClick={(index) => {
                    setValue('locationSearchInput', suggestedLocations[index].name)
                    
                    if (showDoneButton) {
                        setSelectedLocation(suggestedLocations[index])
                    } else {
                        onAddLocation(suggestedLocations[index])
                    }
                }}
                placeholder='Add Location'
                isLoading={isLoadingSuggestedLocations}
                {...register('locationSearchInput')}
                {...props}
            />

            {showDoneButton && (
                <IconButton
                    aria-label='Add location'
                    onClick={() => {
                        if (selectedLocation) {
                            setValue('locationSearchInput', '')
                            setSuggestedLocations([])
                            onAddLocation(selectedLocation)
                        }
                    }}
                >
                    <MdCheck />
                </IconButton>
            )}
        </Flex>
    )
}