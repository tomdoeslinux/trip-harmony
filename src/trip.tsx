export interface Location {
    id: string
    name: string
    lat: number
    lon: number
}

export interface TripDay {
    date: Date,
    locations: Location[]
}

export class Trip {
    readonly itinerary: TripDay[]

    constructor(private readonly startDate: Date, private readonly endDate: Date) {
        this.itinerary = this.generateItinerary()
    }

    private generateItinerary(): TripDay[] {
        const itinerary: TripDay[] = []
        const currentDate = new Date(this.startDate)

        while (currentDate <= this.endDate) {
            itinerary.push({ date: new Date(currentDate), locations: [] })

            currentDate.setDate(currentDate.getDate() + 1)
        }

        return itinerary
    }

    addLocationToDay(date: Date, location: Location) {
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