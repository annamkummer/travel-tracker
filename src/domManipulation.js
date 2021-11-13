export const insertTripsHtml = (userTrips) => {
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
}

export const insertAnnualCostHtml = (cost) => {
  const annualCost = document.querySelector("#dollars")
  annualCost.innerText = `$${cost}`
}
