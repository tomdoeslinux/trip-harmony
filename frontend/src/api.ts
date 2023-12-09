export interface User {
    id: number
    username: string
    email: string
    password: string
}

export interface Location {
    id: number
    name: string
    lat: number
    lon: number
}

export interface TripDay {
    id: number
    date: string
    locations: Location[]
}

export interface Trip {
    id: number
    destination: Location
    name: string
    startDate: string
    endDate: string
    tripDays: TripDay[]
}

export class API {
    private constructor() { }

    private static readonly LOGGED_IN_USER_KEY = 'cur_user'

    static login(user: User) {
        localStorage.setItem(API.LOGGED_IN_USER_KEY, JSON.stringify(user))
    }

    static logout() {
        localStorage.removeItem(API.LOGGED_IN_USER_KEY)
        location.reload()
    }

    static isLoggedIn(): boolean {
        return !!localStorage.getItem(API.LOGGED_IN_USER_KEY)
    }

    static getLoggedInUser(): User {
        return JSON.parse(localStorage.getItem(API.LOGGED_IN_USER_KEY)!) as User
    }

    static async getTrips(userId: number): Promise<Trip[]> {
        const response = await fetch(`http://localhost:8080/api/users/${userId}/trips`, {
            method: 'GET'
        })
        const trips: Trip[] = await response.json()
        return trips
    }

    static async getTripById(tripId: number): Promise<Trip> {
        const response = await fetch(`http://localhost:8080/api/trips/${tripId}`, { 
            method: 'GET'
        })
        const trip: Trip = await response.json()
        return trip
    }

    static async addTrip(userId: number, trip: Trip): Promise<Trip> {
        const response = await fetch(`http://localhost:8080/api/users/${userId}/trips`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(trip)
        })
        const createdTrip = await response.json()

        return createdTrip
    }

    static async createUser(user: User): Promise<User> {
        const response = await fetch('http://localhost:8080/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
        const createdUser = await response.json()

        return createdUser
    }

    static async addLocationToTripDay(tripDayId: number, location: Location): Promise<void> {
        await fetch(`http://localhost:8080/api/trip-days/${tripDayId}/locations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(location)
        })
    }

    static async deleteLocationFromTripDay(tripDayLocationId: number): Promise<void> {
        await fetch(`http://localhost:8080/api/trip-day-locations/${tripDayLocationId}`, {
            method: 'DELETE'
        })
    }
}