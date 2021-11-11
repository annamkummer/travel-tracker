// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'


// console.log('This is the JavaScript entry file - your code begins here.');
// ========================================================================

import { currentTraveler, travelers, trips, destinations } from './fetch.js'
import { insertTripsHtml } from './domManipulation.js'
import Traveler from '../src/Traveler'
import Trip from '../src/Trip'

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
  user.addTrips(dataset.trips, dataset.destinations)
  return user;
}

const loadPage = (dataset) => {
  const currentUser = createUser(dataset)
  console.log(currentUser)

  insertTripsHtml(currentUser.trips)
}

window.addEventListener('load', fetchData)
