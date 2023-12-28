import {Card, CardBody, CardHeader, Heading, IconButton} from "@chakra-ui/react"
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
            onClick={() => props.onClick(props.trip.id)}
        >
            <CardBody padding='0'>
                <img style={{ maxHeight: '300px', width: '100%', objectFit: 'cover', aspectRatio: 1000 / 750 }} src={API.getImgPath(props.trip.photo)} alt={''}/>
            </CardBody>

            <CardHeader height='60px' display='flex' flexDirection='row' alignItems='center'>
                <Heading as='h3' size='sm' fontFamily='Noto Sans' fontWeight='normal'>{props.trip.name}</Heading>

                <TripCardOptions trip={props.trip} />
            </CardHeader>
        </Card>
    )
}
