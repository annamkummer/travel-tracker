// Consider having one GET fetch function that takes in an argument, the url

export const currentTraveler = (id) => {
  return fetch(`http://localhost:3001/api/v1/travelers/${id}`)
    .then(response => response.json())
    .catch(err => showError(err));
}

export const travelers = () => {
  return fetch('http://localhost:3001/api/v1/travelers')
    .then(response => response.json())
    .catch(err => showError(err));
}

export const trips = () => {
  return fetch('http://localhost:3001/api/v1/trips')
    .then(response => response.json())
    .catch(err => showError(err));
}

export const destinations = () => {
  return fetch('http://localhost:3001/api/v1/destinations')
    .then(response => response.json())
    .catch(err => showError(err));
}



// export const sleepPost = (newSleep) => {
//   fetch('http://localhost:3001/api/v1/sleep', {
//     method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(newSleep)
//     })
//     .then(response => isValidated(response,"sleep-status"))
//
//     .catch(err => showError(err));
// }


// 
// travelers: [
// {
// id: 1,
// name: "Ham Leadbeater",
// travelerType: "relaxer"
// },
//
// trips: [
// {
// id: 1,
// userID: 44,
// destinationID: 49,
// travelers: 1,
// date: "2022/09/16",
// duration: 8,
// status: "approved",
// suggestedActivities: [ ]
// },
//
// destinations: [
// {
// id: 1,
// destination: "Lima, Peru",
// estimatedLodgingCostPerDay: 70,
// estimatedFlightCostPerPerson: 400,
// image: "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
// alt: "overview of city buildings with a clear sky"
// },
