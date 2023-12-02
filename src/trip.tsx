export interface TripDay {
    date: Date,
    locations: string[]
}

export class Trip {
    private readonly _itinerary: TripDay[]

    constructor(
        private readonly location: string,
        private readonly startDate: Date,
        private readonly endDate: Date
    ) {
        this._itinerary = this.generateItinerary()
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

    get itinerary(): TripDay[] {
        return this._itinerary
    }
}