// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
// import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'


// console.log('This is the JavaScript entry file - your code begins here.');
// ========================================================================

import './css/base.scss';
import { currentTraveler, travelers, trips, destinations, postTrip } from './fetch.js'
import { date, year, convertDate } from './utils.js'
import { domUpdates } from './domManipulation.js'
import Traveler from '../src/Traveler'
import Trip from '../src/Trip'

let currentUser, allTravelers, allTrips, allDestinations;

const newTripBtn = document.querySelector('#newTrip')
const requestForm = document.querySelector('#requestForm')
const calcCostBtn = document.querySelector('#calcCost')
const formError = document.querySelector('#formError')
const submitTripBtn = document.querySelector('#submit')
const loginBtn = document.querySelector('#loginBtn')
const logoutBtn = document.querySelector('#logoutBtn')
const usernameInput = document.querySelector('#username')
const passwordInput = document.querySelector('#password')
const loginForm = document.querySelector('#loginDetails')
const loginError = document.querySelector('#loginError')



const fetchData = (id) => {
  return Promise.all([currentTraveler(`${id}`), travelers(), trips(), destinations()])
      // Manually adding a travelerId ^^ until login feature is implemented
    .then(data => parseData(data));
}

const parseData = (datasets) => {
  allTravelers = datasets[1].travelers;
  allTrips = datasets[2].trips;
  allDestinations = datasets[3].destinations;
  createUser(datasets[0], allTrips, allDestinations)
}

const createUser = (userData, trips, dests) => {
  const today = date();
  currentUser = new Traveler(userData);
  currentUser.addTrips(trips, dests, today);
  loadPage();
}

const loadPage = () => {
  const currentYear = year();
  const cost = currentUser.calcAnnualTripCost(currentYear);

  domUpdates.welcomeUser(currentUser.getFirstName());
  domUpdates.insertTripsHtml(currentUser.trips);
  domUpdates.insertAnnualCostHtml(cost);
}

const directNewTrip = () => {
  if (requestForm.classList.contains('hidden')) {
    domUpdates.generateTripRequestForm(allDestinations);
    domUpdates.toggleTripRequestForm();
  } else {
    requestForm.reset();
  }
}

const checkValidDate = (inputDate) => {
  const userDate = convertDate(inputDate);
  const today = date();
  return (userDate > today);
}

const checkValidDuration = (inputLength) => {
  return (inputLength > 0)
}

const checkValidNumTravelers = (inputNumTravelers) => {
  return (inputNumTravelers > 0)
}

const getDestinationId = (dest) => {
  return allDestinations.find(destination => {
    return destination.destination === dest;
  }).id
}

const getUserInputs = () => {
  return {
    tripNumTravelers: document.querySelector('#numTravelers').value,
    tripLength: document.querySelector('#duration').value,
    tripDate: document.querySelector('#date').value,
    tripDestination: document.querySelector('#destination').value,
  }
}

const checkValidity = () => {
  event.preventDefault();
  const inputs = getUserInputs();
  const userInputs = {
    numTravelers: {
      check: checkValidNumTravelers(inputs.tripNumTravelers),
      message: 'Please enter at least one traveler',
    },
    length: {
      check: checkValidDuration(inputs.tripLength),
      message: 'Please enter a trip length of at least one day',
    },
    date: {
      check: checkValidDate(inputs.tripDate),
      message: 'Please enter a date in the future',
    }
  }
  let message = 'valid'
  Object.values(userInputs).forEach(input => {
    if (!input.check) {
      message = input.message;
    }
  })
  return message;
}

const createTrip = () => {
  const inputs = getUserInputs();
  const destId = getDestinationId(inputs.tripDestination);
  const newTrip = {
    id: (allTrips.length + 1),
    userID: currentUser.id,
    destinationID: destId,
    travelers: inputs.tripNumTravelers,
    date: convertDate(inputs.tripDate),
    duration: inputs.tripLength,
    status: 'pending',
    suggestedActivities: [],
  }

  return new Trip(newTrip)
}

const handleUserInput = () => {
  const validity = checkValidity();
  if (validity === 'valid') {
    formError.classList.add('hidden')
    const newTrip = createTrip()
    const newTripCost = newTrip.calcCost(allDestinations)
    domUpdates.showTripCost(newTripCost)
  } else {
    formError.classList.remove('hidden')
    domUpdates.showCompleteFormMessage(formError, validity)
  }
}

const submitTrip = () => {
  event.preventDefault();
  const validity = checkValidity();
  if (validity === "valid") {
    const newTrip = createTrip();
    requestForm.reset();
    const today = date();
    currentUser.addTrips([newTrip], allDestinations, today);
    domUpdates.insertTripsHtml(currentUser.trips);
    postTrip(newTrip);
  } else {
    handleUserInput();
  }
}

const validateCredentials = () => {
  event.preventDefault()
  const name = usernameInput.value;
  const chars = name.split('')
  const traveler = chars.splice(0, 8).join('')
  const num = Number(chars.join(''))
  const pass = passwordInput.value;
  const isValid = (traveler === 'traveler' && num > 0 && num < 51 && pass === 'travel')

  if (isValid) {
    domUpdates.showDash()
    fetchData(num)
  } else {
    loginForm.reset();
    loginBtn.disabled = true;
    loginError.innerText = "Username and/or password incorrect"
  }
}

const checkInputs = () => {
  loginError.innerText = ""
  if (usernameInput.value && passwordInput.value) {
    loginBtn.disabled = false;
  }
}

const test = () => {
  console.log('>>>here')
}

window.addEventListener('load', domUpdates.showLogin);
newTripBtn.addEventListener('click', directNewTrip)
calcCostBtn.addEventListener('click', handleUserInput)
submitTripBtn.addEventListener('click', submitTrip)
loginBtn.addEventListener('click', validateCredentials)
logoutBtn.addEventListener('click', domUpdates.showLogin)
usernameInput.addEventListener('keyup', checkInputs)
passwordInput.addEventListener('keyup', checkInputs)
