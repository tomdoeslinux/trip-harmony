import { Card, CardHeader, Heading } from "@chakra-ui/react"
import { API, Trip } from "src/api"

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
            <CardHeader>
                <Heading as='h3' size='sm' fontFamily='Noto Sans' fontWeight='normal'>{props.trip.name}</Heading>
            </CardHeader>
        </Card>
    )
}
