'use strict';

const config = require('../config');
const fs = require('fs');
const colors = require('colors');

function error(error) {
  let errorMessage = 'Error: ' + error.code;
  if(error.code === 'ENOTFOUND') {
    errorMessage = 'There’s been a 404 error. Cannot connect to the to http://shirts4mike.com.';
  }

  // display error
  console.error(errorMessage.red);

  // save error to log
  let date = new Date();
  let dateString = `[${date.toString()}] `;
  fs.appendFile(config.error, dateString + errorMessage + "\n", (error) => {
    if (error) throw error;
  });

}

function success(message) {
  // display message
  console.log(message.green);
}

module.exports.error = error;
module.exports.success = success;
