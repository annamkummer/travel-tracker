import chai from 'chai';
const expect = chai.expect;
import Trip from '../src/Trip'

describe('Trip', function() {
  let trip, destinations, newTrip;
  beforeEach(function() {
    trip = {
        id: 3,
        userID: 3,
        destinationID: 22,
        travelers: 4,
        date: "2022/05/22",
        duration: 17,
        status: "approved",
        suggestedActivities: [ ]
      };

    destinations = [
      {
        id: 49,
        destination: "Castries, St Lucia",
        estimatedLodgingCostPerDay: 650,
        estimatedFlightCostPerPerson: 90,
        image: "https://images.unsplash.com/photo-1524478075552-c2763ea171b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80",
        alt: "aerial photography of rocky mountain under cloudy sky"
      }, {
        id: 22,
        destination: "Rome, Italy",
        estimatedLodgingCostPerDay: 90,
        estimatedFlightCostPerPerson: 650,
        image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        alt: "people standing inside a colosseum during the day"
      }, {
        id: 28,
        destination: "San Juan, Puerto Rico",
        estimatedLodgingCostPerDay: 70,
        estimatedFlightCostPerPerson: 900,
        image: "https://images.unsplash.com/photo-1580237541049-2d715a09486e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2090&q=80",
        alt: "white and brown concrete buildings near sea under white clouds during daytime"
      }, {
        id: 25,
        destination: "New York, New York",
        estimatedLodgingCostPerDay: 175,
        estimatedFlightCostPerPerson: 200,
        image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        alt: "people crossing the street during the day surrounded by tall buildings and advertisements"
      }, {
        id: 16,
        destination: "Bangkok, Thailand",
        estimatedLodgingCostPerDay: 35,
        estimatedFlightCostPerPerson: 988,
        image: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80",
        alt: "ornate buildings with a garden during the day"
      },
    ];

    newTrip = new Trip(trip)
  });

  it('should be a function', function() {
    expect(Trip).to.be.a('function')
  });

  it('should store id, destinationID, travelers, date, duration, and status', function() {
    expect(newTrip.id).to.equal(3);
    expect(newTrip.destinationID).to.equal(22);
    expect(newTrip.travelers).to.equal(4);
    expect(newTrip.date).to.equal("2022/05/22");
    expect(newTrip.duration).to.equal(17);
    expect(newTrip.status).to.equal("approved");
    expect(newTrip.userID).to.equal(undefined);

  });

  it('should not store userID or suggestedActivities', function() {
    expect(newTrip.userID).to.equal(undefined);
    expect(newTrip.suggestedActivities).to.equal(undefined);
  });

  it('should be able to calculate trip cost', function() {
    newTrip.calcCost(destinations)
    expect(newTrip.cost).to.equal(4543);
  });
});
