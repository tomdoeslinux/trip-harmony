import { Flex, InputProps } from "@chakra-ui/react"
import debounce from "lodash.debounce"
import { useState, useCallback, useEffect } from "react"
import { useForm } from "react-hook-form"
import { buildUrl } from "src/util"
import Autocomplete from "src/ui/Autocomplete"
import { Destination } from "src/api"

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

            const url: URL = buildUrl('https://nominatim.openstreetmap.org/search', { q: searchInput, format: 'json' })

            const response = await fetch(url, {
                headers: { 'User-Agent': 'todoescode@gmail.com' }
            })
            const data: any[] = await response.json()

            const destinations: Destination[] = data.map((item) => ({
                name: item.display_name,
                lat: Number(item.lat),
                lon: Number(item.lon)
            }))

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