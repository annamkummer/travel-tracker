// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
// import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'


// console.log('This is the JavaScript entry file - your code begins here.');
// ========================================================================

/*
When Submit button is clicked:
- reset form
- Post the trip to the database,
- Add trip to Traveler's trips
- show trips

*/
import './css/base.scss';
import { currentTraveler, travelers, trips, destinations } from './fetch.js'
import { date, year, convertDate } from './utils.js'
import { domUpdates } from './domManipulation.js'
import Traveler from '../src/Traveler'
import Trip from '../src/Trip'

let currentUser, allTravelers, allTrips, allDestinations;

const newTripBtn = document.querySelector('#newTrip')
const requestForm = document.querySelector('#requestForm')
const calcCostBtn = document.querySelector('#calcCost')
const formError = document.querySelector('#formError')

const fetchData = () => {
  return Promise.all([currentTraveler(44), travelers(), trips(), destinations()])
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
    date: inputs.tripDate,
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

window.addEventListener('load', fetchData);
newTripBtn.addEventListener('click', directNewTrip)
calcCostBtn.addEventListener('click', handleUserInput)

// ========================================================================






//

// const submitTripBtn = document.querySelector('#submit')


//

//

//
// domUpdates.generateTripRequestForm(allDestinations);

//

//

//
// const checkForCompletion = () => {
//   event.preventDefault();
//   const tripDate = document.querySelector('#date').value
//   const tripLength = document.querySelector('#duration').value
//   const tripNumTravelers = document.querySelector('#numTravelers').value
//   const tripDestination = document.querySelector('#destination').value;
//
//   const userInput = {
//     date: convertDate(tripDate),
//     duration: tripLength,
//     travelers: tripNumTravelers,
//     destination: tripDestination
//   }
//
//   let message;
//   console.log("userInputDate", userInput.date)
//   console.log("today", date())
//   console.log("T/F", userInput.date < date())
//   if (userInput.date < date()) {
//     message = "Please enter a date in the future";
//   } else if (userInput.duration < 1) {
//     message = "Minimum trip length is one day";
//   } else if (userInput.travelers < 1) {
//     message = "Minimum number of travelers is one";
//   } else {
//     generateTripCost(userInput)
//     domUpdates.showCompleteFormMessage('')
//     return
//   }
//
//   domUpdates.showCompleteFormMessage(message)
// }
//
// const generateTripCost = (tripInfo) => {
//   event.preventDefault();
//   domUpdates.showCompleteFormMessage('')
//   const newUserTrip = createTrip(tripInfo);
//   const cost = newUserTrip.calcCost(allDestinations)
//   console.log(cost)
//   domUpdates.showTripCost(cost)
// }
//
// const createTrip = (tripInfo) => {
//   const tripId = allDestinations.find(dest => {
//     return dest.destination === tripInfo.destination;
//   }).id
//
//   const newTrip = {
//     id: (allTrips.length + 1),
//     userID: currentUser.id,
//     destinationID: tripId,
//     travelers: tripInfo.travelers,
//     date: tripInfo.date,
//     duration: tripInfo.duration,
//     status: 'pending',
//     suggestedActivities: [],
//   }
//
//   return new Trip(newTrip);
// }

//

//
// submitTripBtn.addEventListener('click', function() {
//   domUpdates.toggleTripRequestForm();
// });
//

//   /*
// When user clicks this button,
// -- 1) Ensure all fields are filled in, if not return error message
// -- 2) create new Trip instance
// -- 3) get Trip cost
// -- 4) display Trip Cost
//
//   */
