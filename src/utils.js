export const date = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const day = today.getDate();

  return `${year}/${month + 1}/${day}`
}

export const year = () => {
  const today = new Date();
  return today.getFullYear();
}

export const convertDate = (date) => {
  return date.split("-").join("/")
}

export const requestedTrip = {
  // id: null,
  // userID: null,
  // destinationID: null,
  // travelers: tripNumTravelers,
  // date: tripDate,
  // duration: tripLength,
  // status: "pending",
  // suggestedActivities: []
}

/*
Data to be stored from initial fetch:
- userID

Data to pull from form:
- travelers: tripNumTravelers,
- date: tripDate,
- duration: tripLength,

Data that can be statically populated:
- status: "pending",
- suggestedActivities: []

Data that needs other fetched datasets:
- id: -- trips.length + 1
- destinationID: find from city input

*/
