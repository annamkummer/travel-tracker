import chai from 'chai';
const expect = chai.expect;
import Traveler from '../src/Traveler'

describe('Traveler', function() {
  let user, travelers, trips, destinations;
  beforeEach(function() {
    travelers = [
      {
        id: 1,
        name: "Ham Leadbeater",
        travelerType: "relaxer"
      }, {
        id: 2,
        name: "Rachael Vaughten",
        travelerType: "thrill-seeker"
      }, {
        id: 3,
        name: "Sibby Dawidowitsch",
        travelerType: "shopper"
      }, {
        id: 4,
        name: "Leila Thebeaud",
        travelerType: "photographer"
      }, {
        id: 5,
        name: "Tiffy Grout",
        travelerType: "thrill-seeker"
      }
    ];

    trips = [
      {
        id: 1,
        userID: 44,
        destinationID: 49,
        travelers: 1,
        date: "2022/09/16",
        duration: 8,
        status: "approved",
        suggestedActivities: [ ]
      }, {
        id: 3,
        userID: 3,
        destinationID: 22,
        travelers: 4,
        date: "2022/05/22",
        duration: 17,
        status: "approved",
        suggestedActivities: [ ]
      }, {
        id: 117,
        userID: 1,
        destinationID: 28,
        travelers: 3,
        date: "2021/01/09",
        duration: 15,
        status: "approved",
        suggestedActivities: [ ]
      }, {
        id: 41,
        userID: 3,
        destinationID: 25,
        travelers: 3,
        date: "2020/08/30",
        duration: 11,
        status: "approved",
        suggestedActivities: [ ]
      }, {
        id: 50,
        userID: 3,
        destinationID: 16,
        travelers: 5,
        date: "2020/07/02",
        duration: 17,
        status: "approved",
        suggestedActivities: [ ]
      },
    ];

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

    user = new Traveler(travelers[2]);
  });

  it('should be a function', function() {
    expect(Traveler).to.be.a('function')
  });

  it('should store user id, name, and type', function() {
    expect(user.id).to.equal(3);
    expect(user.name).to.equal("Sibby Dawidowitsch");
    expect(user.type).to.equal("shopper");
  });

  it('should start with no trips', function() {
    expect(user.trips).to.deep.equal([]);
  });

  it('should be able to add trips', function() {
    user.addTrips(trips, destinations, "2021/11/12");
    expect(user.trips).to.deep.equal([
      {
        date: "2022/05/22",
        status: "upcoming",
        city: "Rome, Italy",
        cost: 4543,
        imgSrc: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        imgAlt: "people standing inside a colosseum during the day",
      }, {
        date: "2020/08/30",
        status: "past",
        city: "New York, New York",
        cost: 2778,
        imgSrc: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        imgAlt: "people crossing the street during the day surrounded by tall buildings and advertisements",
      }, {
        date: "2020/07/02",
        status: "past",
        city: "Bangkok, Thailand",
        cost: 6089,
        imgSrc: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80",
        imgAlt: "ornate buildings with a garden during the day",
      }
    ]);
  });

  it('should be able to get first name', function() {
    expect(user.getFirstName()).to.equal("Sibby");
  });

  it('should be able to calculate cost for trips this year', function() {
    user.addTrips(trips, destinations);
    expect(user.calcAnnualTripCost(2020)).to.equal(8867)
  });

});
