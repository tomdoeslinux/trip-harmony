import { TileLayer, Marker, Popup, MapContainer } from "react-leaflet"
import { Destination } from "src/api"

interface MapProps {
    startingLocation: Destination
    destinations: Destination[]
}

export default function Map(props: MapProps) {
    return (
        <MapContainer
            style={{ height: '100%', width: '100%' }}
            center={[props.startingLocation.lat, props.startingLocation.lon]}
            zoom={13}
            scrollWheelZoom={true}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {props.destinations.map((location, index) => (
                <Marker key={index} position={[location.lat, location.lon]}>
                    <Popup>
                        {location.name}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    )
}