export interface User {
    id: number
    username: string
    email: string
    password: string
}

export interface Location {
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
        const response = await fetch(`http://localhost:8080/api/users/${userId}/trips`)
        const trips: Trip[] = await response.json()
        return trips
    }

    static async getTripById(tripId: number): Promise<Trip> {
        const response = await fetch(`http://localhost:8080/api/trips/${tripId}`)
        const trip: Trip = await response.json()
        return trip
    }
}