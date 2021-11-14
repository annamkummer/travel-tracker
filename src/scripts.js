// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'


// console.log('This is the JavaScript entry file - your code begins here.');
// ========================================================================

import { currentTraveler, travelers, trips, destinations } from './fetch.js'
import { domUpdates } from './domManipulation.js'
import { date, year, convertDate } from './utils.js'
import Traveler from '../src/Traveler'
import Trip from '../src/Trip'

const newTripBtn = document.querySelector('#newTrip')
const submitTripBtn = document.querySelector('#submit')
const calcCostBtn = document.querySelector('#calcCost')

let currentUser, allTrips, allDestinations;

const fetchData = () => {
  return Promise.all([currentTraveler(44), travelers(), trips(), destinations()])
      // Manually adding a travelerId ^^ until login feature is implemented
    .then(data => parseData(data));
}

const parseData = (data) => {
  currentUser = new Traveler(data[0]);
  allTrips = data[2].trips;
  allDestinations = data[3].destinations;
  loadPage();
}

const createUser = () => {
  const today = date();
  currentUser.addTrips(allTrips, allDestinations, today);
}

const loadPage = () => {
  createUser()

  const currentYear = year();
  const cost = currentUser.calcAnnualTripCost(currentYear);

  domUpdates.welcomeUser(currentUser.getFirstName());
  domUpdates.insertTripsHtml(currentUser.trips);
  domUpdates.insertAnnualCostHtml(cost);
  domUpdates.generateTripRequestForm(allDestinations);
}

const checkForCompletion = () => {
  event.preventDefault();
  const tripDate = document.querySelector('#date').value
  const tripLength = document.querySelector('#duration').value
  const tripNumTravelers = document.querySelector('#numTravelers').value
  const tripDestination = document.querySelector('#destination').value;

  const userInput = {
    date: convertDate(tripDate),
    duration: tripLength,
    travelers: tripNumTravelers,
    destination: tripDestination
  }

  let message;
  console.log("userInputDate", userInput.date)
  console.log("today", date())
  console.log("T/F", userInput.date < date())
  if (userInput.date < date()) {
    message = "Please enter a date in the future";
  } else if (userInput.duration < 1) {
    message = "Minimum trip length is one day";
  } else if (userInput.travelers < 1) {
    message = "Minimum number of travelers is one";
  } else {
    generateTripCost(userInput)
    domUpdates.showCompleteFormMessage('')
    return
  }

  domUpdates.showCompleteFormMessage(message)
}

const generateTripCost = (tripInfo) => {
  event.preventDefault();
  const newUserTrip = createTrip(tripInfo);
  const cost = newUserTrip.calcCost(allDestinations)
  console.log(cost)
  domUpdates.showTripCost(cost)
}

const createTrip = (tripInfo) => {
  const tripId = allDestinations.find(dest => {
    return dest.destination === tripInfo.destination;
  }).id

  const newTrip = {
    id: (allTrips.length + 1),
    userID: currentUser.id,
    destinationID: tripId,
    travelers: tripInfo.travelers,
    date: tripInfo.date,
    duration: tripInfo.duration,
    status: 'pending',
    suggestedActivities: [],
  }

  return new Trip(newTrip);
}

window.addEventListener('load', fetchData);

newTripBtn.addEventListener('click', function() {
  domUpdates.toggleTripRequestForm();
});

submitTripBtn.addEventListener('click', function() {
  domUpdates.toggleTripRequestForm();
});

calcCostBtn.addEventListener('click', checkForCompletion)
  /*
When user clicks this button,
-- 1) Ensure all fields are filled in, if not return error message
-- 2) create new Trip instance
-- 3) get Trip cost
-- 4) display Trip Cost

  */
