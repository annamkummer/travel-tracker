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
import { date, year } from './utils.js'
import Traveler from '../src/Traveler'
// import Trip from '../src/Trip'

const newTripBtn = document.querySelector('#newTrip')
const submitTripBtn = document.querySelector('#submit')
// const calcCostBtn = document.querySelector('#calcCost')

let currentUser, allTrips, allDestinations;

const fetchData = () => {
  return Promise.all([currentTraveler(50), travelers(), trips(), destinations()])
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

// const calcTripCost = () => {
//   event.preventDefault();
//   const tripDate = document.querySelector('#date').value
//   const tripLength = document.querySelector('#duration').value
//   const tripNumTravelers = document.querySelector('#numTravelers').value
//   const tripDestination = document.querySelector('#destination').value
//
// }

window.addEventListener('load', fetchData);

newTripBtn.addEventListener('click', function() {
  domUpdates.toggleTripRequestForm();
});

submitTripBtn.addEventListener('click', function() {
  domUpdates.toggleTripRequestForm();
});
// calcCostBtn.addEventListener('click', calcTripCost)
