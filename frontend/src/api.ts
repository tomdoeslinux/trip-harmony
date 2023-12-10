export interface User {
    id: number
    username: string
    email: string
    password: string
}

export interface Destination {
    name: string
    lat: number
    lon: number
}

export interface Activity {
    id: number
    name: string
    destination: Destination
    startTime?: string
    endTime?: string
}

export interface Day {
    id: number
    date: string
    activities: Activity[]
}

export interface Trip {
    id: number
    destination: Destination
    name: string
    startDate: string
    endDate: string
    days: Day[]
}

export class API {
    private constructor() { }

    private static readonly LOGGED_IN_USER_KEY = 'logged_in_user'

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

    static async getTrips(userId: number): Promise<Trip[]> {
        const response = await fetch(`http://localhost:8080/api/users/${userId}/trips`, {
            method: 'GET'
        })
        const trips: Trip[] = await response.json()
        return trips
    }

    static async getTripById(id: number): Promise<Trip> {
        const response = await fetch(`http://localhost:8080/api/trips/${id}`, { 
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

    static async addActivity(dayId: number, activity: Activity): Promise<void> {
        await fetch(`http://localhost:8080/api/days/${dayId}/activities`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(activity)
        })
    }

    static async deleteActivity(id: number): Promise<void> {
        await fetch(`http://localhost:8080/api/activities/${id}`, {
            method: 'DELETE'
        })
    }

    static async updateActivityTimes(id: number, newStartTime: string, newEndTime: string) {
        await fetch(`http://localhost:8080/api/activities/${id}/times`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ startTime: newStartTime, endTime: newEndTime })
        })
    }
}