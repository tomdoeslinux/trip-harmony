import { _Trip, TripCtor } from "src/trip";

export class TripDB {
    private static trip1: TripCtor = {
        id: '0',
        name: 'Trip to Cities A and B',
        location: { id: '1', name: 'City A', lat: 40.7128, lon: -74.0060 },
        startDate: new Date('2023-01-01'),
        endDate: new Date('2023-01-03')
    };

    private static trip2: TripCtor = {
        id: '1',
        name: 'Trip to Cities B and C',
        location: { id: '2', name: 'City B', lat: 34.0522, lon: -118.2437 },
        startDate: new Date('2023-01-02'),
        endDate: new Date('2023-01-04')
    };

    private static trip3: TripCtor = {
        id: '2',
        name: 'City Hopping Adventure',
        location: { id: '3', name: 'City C', lat: 51.5074, lon: -0.1278 },
        startDate: new Date('2023-01-05'),
        endDate: new Date('2023-01-07')
    };

    private static trip4: TripCtor = {
        id: '3',
        name: 'Exploring the Metropolis',
        location: { id: '1', name: 'City A', lat: 40.7128, lon: -74.0060 },
        startDate: new Date('2023-01-08'),
        endDate: new Date('2023-01-10')
    };

    private static trip5: TripCtor = {
        id: '4',
        name: 'Coastal Getaway',
        location: { id: '2', name: 'City B', lat: 34.0522, lon: -118.2437 },
        startDate: new Date('2023-01-11'),
        endDate: new Date('2023-01-14')
    };

    static trips: _Trip[] = [
        new _Trip(TripDB.trip1),
        new _Trip(TripDB.trip2),
        new _Trip(TripDB.trip3),
        new _Trip(TripDB.trip4),
        new _Trip(TripDB.trip5)
    ];

    static addTrip(tripCtor: TripCtor) {
        TripDB.trips.push(new _Trip(tripCtor))
    }

    private constructor() { }
}