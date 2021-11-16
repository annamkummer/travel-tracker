// Consider having one GET fetch function that takes in an argument, the url

export const currentTraveler = (id) => {
  return fetch(`http://localhost:3001/api/v1/travelers/${id}`)
    .then(response => response.json())
    .catch(err => handleError(err));
}

export const travelers = () => {
  return fetch('http://localhost:3001/api/v1/travelers')
    .then(response => response.json())
    .catch(err => handleError(err));
}

export const trips = () => {
  return fetch('http://localhost:3001/api/v1/trips')
    .then(response => response.json())
    .catch(err => handleError(err));
}

export const destinations = () => {
  return fetch('http://localhost:3001/api/v1/destinations')
    .then(response => response.json())
    .catch(err => handleError(err));
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
    .catch(err => handleError(err))
}

export const handleError = (error) => {
  const tripSection = document.querySelector('#trips')
  if (error.message === "Failed to fetch") {
    tripSection.innerHTML = `
      <p class="fetch-error">Oops, something went wrong! Please check your internet connection.</p>
    `
  } else {
    tripSection.innerHTML = `
      <p class="fetch-error">${error.message}</p>
    `
  }
}
