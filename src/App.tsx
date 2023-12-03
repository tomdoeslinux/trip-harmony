import './App.css'
import { Grid, GridItem, Heading, Flex, IconButton, Box, } from '@chakra-ui/react'
import { Location, Trip, TripDay } from './trip'
import { MdArrowForwardIos, MdCheck, MdLocationPin } from 'react-icons/md'
import { useCallback, useEffect, useMemo, useState } from 'react'
import Autocomplete from './ui/Autocomplete'
import { buildUrl } from './util'
import { TileLayer, Marker, Popup, MapContainer } from 'react-leaflet'
import { useForm } from 'react-hook-form'
import debounce from 'lodash.debounce'

function createTrip(): Trip {
    const currentDate = new Date()
    const endDate = new Date()
    endDate.setDate(currentDate.getDate() + 3)

    return new Trip(currentDate, endDate)
}

interface AddLocationProps {
    onAddLocation: (location: Location) => void
}

function AddLocation(props: AddLocationProps) {
    const { register, watch, setValue } = useForm<{ locationSearchInput: string }>()
    const [suggestedLocations, setSuggestedLocations] = useState<Location[]>([])
    const [isLoadingSuggestedLocations, setIsLoadingSuggestedLocations] = useState(false)
    const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
    const locationSearchInput = watch('locationSearchInput')

    async function fetchSuggestedLocations(searchInput: string) {
        if (searchInput?.trim().length > 0) {
            setIsLoadingSuggestedLocations(true)

            const url: URL = buildUrl('https://nominatim.openstreetmap.org/search', { q: searchInput, format: 'json' })

            const response = await fetch(url, { 
                headers: { 'User-Agent': 'todoescode@gmail.com' } 
            })
            const data: any[] = await response.json()

            const locations: Location[] = data.map((item) => ({ 
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
                onSuggestionClick={(index: number) => {
                    setValue('locationSearchInput', suggestedLocations[index].name)
                    setSelectedLocation(suggestedLocations[index])
                }}
                placeholder='Add Location'
                isLoading={isLoadingSuggestedLocations}
                {...register('locationSearchInput')}
            />

            <IconButton 
                aria-label='Add location' 
                onClick={() => {
                    if (selectedLocation) {
                        setValue('locationSearchInput', '')
                        setSuggestedLocations([])
                        props.onAddLocation(selectedLocation)
                    }
                }}
            >
                <MdCheck />
            </IconButton>
        </Flex>
    )
}

interface TripDayComponentProps {
    tripDay: TripDay
    onAddLocation: (location: Location) => void
}

function TripDayComponent(props: TripDayComponentProps) {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <Flex flexDirection='column' gap='8px'>
            <Flex alignItems='center'>
                <IconButton
                    aria-label='Expand/Collapse'
                    variant='ghost'
                    onClick={() => setIsExpanded((prevIsExpanded) => !prevIsExpanded)}
                >
                    <Box transform={`rotate(${isExpanded ? 90 : 0}deg)`} transition='transform 0.05s'>
                        <MdArrowForwardIos />
                    </Box>
                </IconButton>

                <Heading as='h2' size='md'>{props.tripDay.date.toDateString()}</Heading>
            </Flex>

            {isExpanded && (
                <Flex flexDirection='column' gap='8px'>
                    <AddLocation onAddLocation={props.onAddLocation} />

                    {props.tripDay.locations.map((location, index) => (
                        <Flex
                            alignItems='center'
                            gap='8px' 
                            padding='8px' 
                            shadow='md' 
                            key={index}
                        >
                            <MdLocationPin />
                            {location.name}
                        </Flex>
                    ))}
                </Flex>
            )}
        </Flex>
    )
}

interface MapProps {
    locations: Location[]
}

function Map(props: MapProps) {
    return (
        <MapContainer
            style={{ height: '100%', width: '100%' }}
            center={[0, 0]}
            zoom={13}
            scrollWheelZoom={true}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {props.locations.map((location, index) => (
                <Marker key={index} position={[location.lat, location.lon]}>
                    <Popup>
                        {location.name}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    )
}

function App() {
    const trip: Trip = useMemo(() => createTrip(), [])
    const [itinerary, setItinerary] = useState(trip.itinerary)

    return (
        <Grid templateColumns='repeat(2, 1fr)' width='100vw' height='100vh'>
            <GridItem 
                gridColumn={1} 
                padding='32px'
                gap='8px'
                display='flex' 
                flexDirection='column'
            >
                {itinerary.map((tripDay, index) => (
                    <TripDayComponent 
                        key={index} 
                        tripDay={tripDay}
                        onAddLocation={(location: Location) => {
                            trip.addLocationToDay(tripDay.date, location)
                            setItinerary([...trip.itinerary])
                        }} 
                    />
                ))}
            </GridItem>

            <GridItem gridColumn={2} background='gray'>
                <Map locations={itinerary.map((itinerary) => itinerary.locations).flat()} />
            </GridItem>
        </Grid>
    )
}

export default App
