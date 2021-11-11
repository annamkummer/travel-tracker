export default class Trip {
  constructor() {
    this.id = 1,
    this.userID = 44,
    this.destinationID = 49,
    this.travelers = 1,
    this.date = "2022/09/16",
    this.duration = 8,
    this.status = "approved",
    this.suggestedActivities = [ ]
  }

  findDestination(destinations) {
    return destinations.find(dest => {
      return dest.id === this.destinationID;
    })
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
