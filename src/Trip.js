export default class Trip {
  constructor(trip) {
    this.id = trip.id;
    this.userID = trip.userID;
    this.destinationID = trip.destinationID;
    this.travelers = trip.travelers;
    this.date = trip.date;
    this.duration = trip.duration;
    this.status = trip.status;
    this.suggestedActivities = trip.suggestedActivities;
  }

  findDestination(destinations) {
    return destinations.find(dest => {
      return dest.id === this.destinationID;
    })
  }

  getStatus(date) {
    const startDate = new Date(this.date);
    const endDate = new Date(Number(startDate))
    endDate.setDate(startDate.getDate() + this.duration)
    const today = new Date(date)

    if (this.status === "approved") {
      if (endDate < today) {
        return "past"
      } else if (startDate > today) {
        return "upcoming"
      } else {
        return "current"
      }
    }
    return "pending"
  }

  getCity(dests) {
    return this.findDestination(dests).destination;
  }

  getImgSrc(dests) {
    return this.findDestination(dests).image;
  }

  getImgAlt(dests) {
    return this.findDestination(dests).alt;
  }

  calcCost(dests) {
    const dest = this.findDestination(dests);
    const lodging = dest.estimatedLodgingCostPerDay * this.duration;
    const flights = dest.estimatedFlightCostPerPerson * this.travelers;
    const total = Number(((lodging + flights) * 1.1).toFixed(0))

    return total;
  }
}
