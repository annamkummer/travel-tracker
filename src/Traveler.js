
import Trip from '../src/Trip'

export default class Traveler {
  constructor(traveler) {
    this.id = traveler.id;
    this.name = traveler.name;
    this.type = traveler.travelerType;
    this.trips = [];
  }

  addTrips(trips, destinations) {
    trips.filter(trip => {
      return trip.userID === this.id;
    }).forEach(trip => {
      const newTrip = new Trip(trip);
      newTrip.calcCost(destinations)
      this.trips.push(newTrip)
    })
  }

  getFirstName() {
    return this.name.split(" ")[0]
  }

  calcAnnualTripCost(year) {
    const thisYearTrips = this.trips.filter(trip => {
      const tripYear = Number(trip.date.split("/")[0]);
      return tripYear === year;
    })

    return thisYearTrips.reduce((totalCost, trip) => {
      totalCost += trip.cost;
      return totalCost;
    }, 0)
  }
}
