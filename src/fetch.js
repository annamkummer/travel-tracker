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

export const showError = (err) => {
  console.log(err)
}

export const postTrip = (trip) => {
  fetch('http://localhost:3001/api/v1/trips', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(trip)
  })
    .then(response => response.json())
    .then(data => console.log(">>>>>", data))
    .catch(err => showError(err))
}
