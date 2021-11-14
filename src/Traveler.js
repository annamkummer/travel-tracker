
import Trip from '../src/Trip'

export default class Traveler {
  constructor(traveler) {
    this.id = traveler.id;
    this.name = traveler.name;
    this.type = traveler.travelerType;
    this.trips = [];
  }

  addTrips(trips, destinations, date) {
    trips.filter(trip => {
      return trip.userID === this.id;
    }).forEach(trip => {
      const newTrip = new Trip(trip);
      const userTrip = {
        date: newTrip.date,
        status: newTrip.getStatus(date),
        city: newTrip.getCity(destinations),
        cost: newTrip.calcCost(destinations),
        imgSrc: newTrip.getImgSrc(destinations),
        imgAlt: newTrip.getImgAlt(destinations),
      };
      this.trips.push(userTrip)
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

    const cost = thisYearTrips.reduce((totalCost, trip) => {
      totalCost += trip.cost;
      return totalCost;
    }, 0)

    return Number((cost * 1.1).toFixed(0))
  }
}
