export interface TripDay {
    date: Date
}

export class Trip {
    private readonly startDate: Date
    private readonly endDate: Date
    private readonly _itinerary: TripDay[]

    constructor(startDate: Date, endDate: Date) {
        this.startDate = startDate
        this.endDate = endDate
        this._itinerary = this.generateItinerary()
    }

    private generateItinerary(): TripDay[] {
        const itinerary: TripDay[] = []
        const currentDate = new Date(this.startDate)

        while (currentDate <= this.endDate) {
            itinerary.push({ date: new Date(currentDate) })

            currentDate.setDate(currentDate.getDate() + 1)
        }

        return itinerary
    }

    get itinerary(): TripDay[] {
        return this._itinerary
    }
}