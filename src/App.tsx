import './App.css'
import { Grid, GridItem, Heading, Flex, IconButton, Box, } from '@chakra-ui/react'
import { Trip, TripDay } from './trip'
import { MdArrowForwardIos } from 'react-icons/md'
import { useCallback, useEffect, useState } from 'react'
import Autocomplete from './ui/Autocomplete'
import { buildUrl } from './util'
import { TileLayer, Marker, Popup, MapContainer } from 'react-leaflet'
import { useForm } from 'react-hook-form'
import debounce from 'lodash.debounce'

function createTrip(): Trip {
    const currentDate = new Date()
    const endDate = new Date()
    endDate.setDate(currentDate.getDate() + 3)

    return new Trip('North Dakota', currentDate, endDate)
}

function AddLocation() {
    const { register, watch } = useForm<{ locationSearchInput: string }>()
    const [suggestedPlaces, setSuggestedPlaces] = useState<string[]>([])
    const [isLoadingSuggestedPlaces, setIsLoadingSuggestedPlaces] = useState(false)
    const locationSearchInput = watch('locationSearchInput')

    async function fetchSuggestedPlaces(searchInput: string) {
        if (searchInput?.trim().length > 0) {
            setIsLoadingSuggestedPlaces(true)

            const url: URL = buildUrl('https://nominatim.openstreetmap.org/search', { q: searchInput, format: 'json' })

            const response = await fetch(url, { 
                headers: { 'User-Agent': 'todoescode@gmail.com' } 
            })
            const data: any[] = await response.json()

            const places: string[] = data.map((item) => item.display_name)

            setSuggestedPlaces(places)
            setIsLoadingSuggestedPlaces(false)
        } 
    }

    const debouncedFetchSuggestedPlaces = useCallback(debounce(fetchSuggestedPlaces, 300), [])

    useEffect(() => {
        debouncedFetchSuggestedPlaces(locationSearchInput)

        if (locationSearchInput?.trim().length === 0) {
            setSuggestedPlaces([])
            debouncedFetchSuggestedPlaces.cancel()
        }

        return () => {
            debouncedFetchSuggestedPlaces.cancel()
        }
    }, [locationSearchInput])
    
    return (
        <Autocomplete 
            suggestions={suggestedPlaces} 
            placeholder='Add Location' 
            isLoading={isLoadingSuggestedPlaces}
            {...register('locationSearchInput')} 
        />
    )
}

interface TripDayComponentProps {
    tripDay: TripDay
}

function TripDayComponent(props: TripDayComponentProps) {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <Flex flexDirection='column' gap='8px'>
            <Flex alignItems='center'>
                <IconButton
                    aria-label={''}
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
                <AddLocation />
            )}
        </Flex>
    )
}

function Map() {
    return (
        <MapContainer
            style={{ height: '100%', width: '100%' }}
            center={[51.505, -0.09]}
            zoom={13}
            scrollWheelZoom={true}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[51.505, -0.09]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    )
}

function App() {
    const trip = createTrip()

    return (
        <Grid templateColumns='repeat(2, 1fr)' width='100vw' height='100vh'>
            <GridItem 
                gridColumn={1} 
                padding='32px'
                gap='8px'
                display='flex' 
                flexDirection='column'
            >
                {trip.itinerary.map((tripDay, index) => (
                    <TripDayComponent key={index} tripDay={tripDay} />
                ))}
            </GridItem>

            <GridItem gridColumn={2} background='gray'>
                <Map />
            </GridItem>
        </Grid>
    )
}

export default App
