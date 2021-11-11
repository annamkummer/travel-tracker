// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'


console.log('This is the JavaScript entry file - your code begins here.');
// ========================================================================

import { travelers, trips, destinations } from './fetch.js'

const fetchData = () => {
  return Promise.all([travelers, trips, destinations])
    .then(data => parseData(data));
}

const parseData = (data) => {
  return {
    travelers: data[0],
    trips: data[1]
  }
}

fetchData();
