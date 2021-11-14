export const domUpdates = {
  welcomeUser(name) {
    const welcome = document.querySelector('#welcome')
    welcome.innerText = `Hello, ${name}`
  },

  insertTripsHtml(userTrips) {
    const tripPane = document.querySelector("#trips")

    userTrips.forEach(userTrip => {
      tripPane.innerHTML += `
        <article class="trip">
          <aside class="trip-details">
            <p><span class="trip-status ${userTrip.status}">${userTrip.status}</span></p>
            <h3 class="city">${userTrip.city}</h3>
            <p class="trip-cost">Trip Cost: $${userTrip.cost}</p>
          </aside>
          <img src=${userTrip.imgSrc} alt=${userTrip.imgAlt} class="trip-img">
        </article>
      `
    })
  },

  insertAnnualCostHtml(cost) {
    const annualCost = document.querySelector("#dollars")
    annualCost.innerText = `$${cost}`
  },

  generateTripRequestForm(destinations) {
    const destination = document.querySelector('#destination')
    destinations.forEach(dest => {
      destination.innerHTML += `
        <option value="${dest.destination}">${dest.destination}</option>
      `
    })
  },

  toggleTripRequestForm() {
    const requestForm = document.querySelector('#requestForm')
    requestForm.classList.toggle('hidden')
  }

}


// export const showTripCost = () => {
//   console.log('heya')
//
// }
