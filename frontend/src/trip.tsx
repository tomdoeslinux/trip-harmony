export interface _Location {
    id: string
    name: string
    lat: number
    lon: number
}

export interface _TripDay {
    date: Date,
    locations: _Location[]
}

export interface TripCtor {
    id: string
    name: string
    location: _Location
    startDate: Date
    endDate: Date
}

export class _Trip {
    readonly id: string
    readonly itinerary: _TripDay[]
    readonly name: string
    readonly location: _Location
    private readonly startDate: Date
    private readonly endDate: Date

    constructor(ctor: TripCtor) {
        this.id = ctor.id
        this.name = ctor.name;
        this.location = ctor.location;
        this.startDate = ctor.startDate;
        this.endDate = ctor.endDate;

        this.itinerary = this.generateItinerary()
    }

    private generateItinerary(): _TripDay[] {
        const itinerary: _TripDay[] = []
        const currentDate = new Date(this.startDate)

        while (currentDate <= this.endDate) {
            itinerary.push({ date: new Date(currentDate), locations: [] })

            currentDate.setDate(currentDate.getDate() + 1)
        }

        return itinerary
    }

    addLocationToDay(date: Date, location: _Location) {
        const tripDay = this.itinerary.find((tripDay) => tripDay.date.getTime() === date.getTime())

        if (tripDay) {
            tripDay.locations.push(location)
        }
    }

    deleteLocationById(locationId: string) {
        for (const tripDay of this.itinerary) {
            if (tripDay.locations.find((location) => location.id === locationId)) {
                tripDay.locations = tripDay.locations.filter((location) => location.id !== locationId)
                break
            } 
        }
    }
}