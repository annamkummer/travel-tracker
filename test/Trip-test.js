import chai from 'chai';
const expect = chai.expect;
import Trip from '../src/Trip'

describe('Trip', function() {
  let trip, trip1, destinations, newTrip, newTrip1;
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

    trip1 = {
      id: 3,
      userID: 3,
      destinationID: 22,
      travelers: 4,
      date: "2022/05/22",
      duration: 17,
      status: "pending",
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
    newTrip1 = new Trip(trip1)
  });

  it('should be a function', function() {
    expect(Trip).to.be.a('function')
  });

  it('should store trip data', function() {
    expect(newTrip).to.deep.equal(trip);
  });

  it('should be able to get the trip status', function() {
    expect(newTrip.getStatus('2021/11/16')).to.equal("upcoming")
    expect(newTrip.getStatus('2022/07/16')).to.equal("past")
    expect(newTrip.getStatus('2022/06/02')).to.equal("current")
    expect(newTrip1.getStatus('2021/11/16')).to.equal("pending")
  })

  it('should be able to get the destination city', function() {
    expect(newTrip.getCity(destinations)).to.equal("Rome, Italy")
  });

  it('should be able to get the destination image source', function() {
    expect(newTrip.getImgSrc(destinations)).to
      .equal("https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80")
  });

  it('should be able to get the destination image alt text', function() {
    expect(newTrip.getImgAlt(destinations)).to.equal("people standing inside a colosseum during the day")
  });

  it('should be able to calculate trip cost', function() {
    expect(newTrip.calcCost(destinations)).to.equal(4543);
  });
});
