export const domUpdates = {
  welcomeUser(name) {
    const welcome = document.querySelector('#welcome');
    welcome.innerText = `Hello, ${name}`;
  },

  insertTripsHtml(userTrips) {
    const tripPane = document.querySelector("#trips");
    tripPane.innerHTML = ``
    userTrips.forEach(userTrip => {
      tripPane.innerHTML += `
        <article class="trip">
          <aside class="trip-details">
            <div><span class="trip-status ${userTrip.status}">${userTrip.status}</span></div>
            <h3 class="city">${userTrip.city}</h3>
            <p class="trip-cost">Trip Cost: $${userTrip.cost}</p>
          </aside>
          <img src=${userTrip.imgSrc} alt=${userTrip.imgAlt} class="trip-img">
        </article>
      `
    });
  },

  insertAnnualCostHtml(cost) {
    const annualCost = document.querySelector("#dollars");
    annualCost.innerText = `$${cost}`;
  },

  generateTripRequestForm(destinations) {
    const destination = document.querySelector('#destination');
    destinations.forEach(dest => {
      destination.innerHTML += `
        <option value="${dest.destination}">${dest.destination}</option>
      `
    });
  },

  toggleTripRequestForm() {
    const requestForm = document.querySelector('#requestForm');
    requestForm.classList.toggle('hidden');
  },

  showCompleteFormMessage(formError, message) {
    formError.innerText = message;
  },

  showTripCost(cost) {
    const tripCost = document.querySelector('#tripCost');
    tripCost.innerText = `$${cost}`;
  },

  showLogin() {
    const dashboard = document.querySelector('#main');
    const loginPage = document.querySelector('#login');
    const loginBtn = document.querySelector('#loginBtn');
    loginPage.classList.remove('hidden');
    dashboard.classList.add('hidden');
    loginBtn.disabled = true;
  },


  showDash() {
    const loginPage = document.querySelector('#login');
    const dashboard = document.querySelector('#main');
    loginPage.classList.add('hidden');
    dashboard.classList.remove('hidden');
    event.preventDefault();
  }
}
