import { Flex, InputProps } from "@chakra-ui/react"
import debounce from "lodash.debounce"
import { useState, useCallback, useEffect } from "react"
import { useForm } from "react-hook-form"
import Autocomplete from "src/ui/Autocomplete"
import { API, Destination } from "src/api"

type DestinationInputProps = {
    onAddLocation: (location: Destination) => void
} & InputProps

export default function DestinationInput({ onAddLocation, ...props }: DestinationInputProps) {
    const { register, watch, setValue } = useForm<{ locationSearchInput: string }>()
    const [suggestedDestinations, setSuggestedDestinations] = useState<Destination[]>([])
    const [isLoadingSuggestedLocations, setIsLoadingSuggestedLocations] = useState(false)
    const locationSearchInput = watch('locationSearchInput')

    async function fetchSuggestedLocations(searchInput: string) {
        if (searchInput?.trim().length > 0) {
            setIsLoadingSuggestedLocations(true)

            const destinations: Destination[] = await API.nomatim_getSuggestedDestinations(searchInput)

            setSuggestedDestinations(destinations)
            setIsLoadingSuggestedLocations(false)
        }
    }

    const debouncedFetchSuggestedLocations = useCallback(debounce(fetchSuggestedLocations, 300), [])

    useEffect(() => {
        debouncedFetchSuggestedLocations(locationSearchInput)

        if (locationSearchInput?.trim().length === 0) {
            setSuggestedDestinations([])
            debouncedFetchSuggestedLocations.cancel()
        }

        return () => {
            debouncedFetchSuggestedLocations.cancel()
        }
    }, [locationSearchInput])

    return (
        <Autocomplete
            suggestions={suggestedDestinations.map((location) => location.name)}
            onSuggestionClick={(index) => {
                setValue('locationSearchInput', suggestedDestinations[index].name)
                onAddLocation(suggestedDestinations[index])
            }}
            placeholder='Add Location'
            isLoading={isLoadingSuggestedLocations}
            {...register('locationSearchInput')}
            {...props}
        />
    )
}