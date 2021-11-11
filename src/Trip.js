export default class Trip {
  constructor(trip) {
    this.id = trip.id;
    this.destinationID = trip.destinationID;
    this.travelers = trip.travelers;
    this.date = trip.date;
    this.duration = trip.duration;
    this.status = trip.status;
  }

  calcCost(destinations) {
    const destination = destinations.find(dest => {
      return dest.id === this.destinationID;
    });
    const lodging = destination.estimatedLodgingCostPerDay * this.duration;
    const flights = destination.estimatedFlightCostPerPerson * this.travelers;

    const total = Number(((lodging + flights) * 1.1).toFixed(0))

    this.cost = total;
  }
}
