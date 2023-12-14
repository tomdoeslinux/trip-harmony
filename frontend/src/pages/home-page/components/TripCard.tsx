import { Card, CardHeader, Heading, IconButton } from "@chakra-ui/react"
import { API, Trip } from "src/api"
import TripCardOptions from "src/pages/home-page/components/TripCardOptions"

interface TripCardProps {
    trip: Trip
    onClick: (tripId: number) => void
}

export default function TripCard(props: TripCardProps) {
    return (
        <Card 
            flexDirection='column' 
            minHeight='300px' 
            onClick={() => props.onClick(props.trip.id)}
            backgroundImage={API.getImgPath(props.trip.photo)}
            backgroundSize='cover'
        >
            <CardHeader height='60px' display='flex' flexDirection='row' alignItems='center'>
                <Heading as='h3' size='sm' fontFamily='Noto Sans' fontWeight='normal'>{props.trip.name}</Heading>

                <TripCardOptions trip={props.trip} />
            </CardHeader>
        </Card>
    )
}
