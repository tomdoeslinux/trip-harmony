import { buildUrl } from "src/util"

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
    notes: Note[]
}

export interface Trip {
    id: number
    photo: string
    destination: Destination
    name: string
    startDate: string
    endDate: string
    days: Day[]
}

export type NewTrip = Pick<Trip, 'name' | 'destination' | 'startDate' | 'endDate'> & { file?: any, unsplashPhotoUrl?: string }
export type EditTrip = Pick<Trip, 'name' | 'startDate' | 'endDate' | 'destination'> 

export interface Note {
    id: number
    text: string
}

export interface LoginParam {
    username: string
    password: string
}

export class API {
    private constructor() { }

    private static readonly LOGGED_IN_USER_KEY = 'logged_in_user'

    static async login(loginParam: LoginParam) {
        const response = await fetch('http://localhost:8080/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginParam)
        })

        const loggedInUser: User = await response.json()
        API.login(loggedInUser)

        localStorage.setItem(API.LOGGED_IN_USER_KEY, JSON.stringify(loggedInUser))
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

    static async addTrip(userId: number, trip: NewTrip): Promise<Trip> {
        const formData = new FormData()

        if (trip.file) {
            formData.append('file', trip.file![0])
        }
        delete trip.file
        formData.append('trip', new Blob([JSON.stringify(trip)], { type: 'application/json' }))

        const response = await fetch(`http://localhost:8080/api/users/${userId}/trips`, {
            method: 'POST',
            body: formData
        })
        const createdTrip: Trip = await response.json()

        return createdTrip
    }

    static async editTrip(id: number, editTrip: EditTrip): Promise<void> {
        await fetch(`http://localhost:8080/api/trips/${id}`, {
            method: 'PATCH', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editTrip)
        })
    }

    static async deleteTrip(id: number): Promise<void> {
        await fetch(`http://localhost:8080/api/trips/${id}`, {
            method: 'DELETE'
        })
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

    static async updateActivityTimes(id: number, newStartTime: string, newEndTime: string): Promise<void> {
        await fetch(`http://localhost:8080/api/activities/${id}/times`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ startTime: newStartTime, endTime: newEndTime })
        })
    }

    static async addNote(dayId: number, note: Note): Promise<void> {
        await fetch(`http://localhost:8080/api/days/${dayId}/notes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(note)
        })
    }

    static getImgPath(fileName: string): string {
        return `http://localhost:8080/i/${fileName}`
    }

    static async nomatim_getSuggestedDestinations(searchInput: string): Promise<Destination[]> {
        const url: URL = buildUrl('https://nominatim.openstreetmap.org/search', { q: searchInput, format: 'json' })

        const response = await fetch(url, { 
            headers: { 'User-Agent': 'todoescode@gmail.com' } 
        })
        const data: any[] = await response.json()

        const destinations: Destination[] = data.map((item) => ({
            name: item.display_name,
            lat: Number(item.lat),
            lon: Number(item.lon)
        }))

        return destinations
    }

    static async unsplash_search(query: string): Promise<string[]> {
        const url: URL = buildUrl(`http://localhost:8080/api/unsplash-proxy/search/photos`, { query: query })
       
        const response = await fetch(url)
        const photos: string[] = await response.json()

        return photos
    }
}