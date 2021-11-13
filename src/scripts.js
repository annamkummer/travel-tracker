// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'


// console.log('This is the JavaScript entry file - your code begins here.');
// ========================================================================

import { currentTraveler, travelers, trips, destinations } from './fetch.js'
import { insertTripsHtml, insertAnnualCostHtml, toggleTripRequestForm, generateTripRequestForm } from './domManipulation.js'
import { date, year } from './utils.js'
import Traveler from '../src/Traveler'

const newTripBtn = document.querySelector('#newTrip')
const submitTripBtn = document.querySelector('#submit')

const fetchData = () => {
  return Promise.all([currentTraveler(50), travelers(), trips(), destinations()])
      // Manually adding a travelerId ^^ until login feature is implemented
    .then(data => parseData(data));
}

const parseData = (data) => {
  const parsedData = {
    currentTraveler: data[0],
    allTravelers: data[1],
    trips: data[2].trips,
    destinations: data[3].destinations,
  }
  loadPage(parsedData)
}

const createUser = (dataset) => {
  const user = new Traveler(dataset.currentTraveler)
  const today = date();
  user.addTrips(dataset.trips, dataset.destinations, today)
  return user;
}

const loadPage = (dataset) => {
  const currentUser = createUser(dataset);
  insertTripsHtml(currentUser.trips);

  const currentYear = year();
  const cost = currentUser.calcAnnualTripCost(currentYear);
  insertAnnualCostHtml(cost);

  const destinations = dataset.destinations;
  generateTripRequestForm(destinations);
}

window.addEventListener('load', fetchData)
newTripBtn.addEventListener('click', function() {
  toggleTripRequestForm();
})
submitTripBtn.addEventListener('click', toggleTripRequestForm)
