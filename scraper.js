'use strict';

const config = require('./config');
const csv = require('./modules/csv');
const logger = require('./modules/logger');
const Xray = require("x-ray")

// x-ray initialization
const x = Xray();

// start from the main page
x(config.url, '.products li', [{
  // go to links and parse full info
  URL: 'a@href',
  productInfo: x('a@href', {
    Title: 'title',
    Price: '.price',
    ImageURL: '.shirt-picture img@src'
  })
}])(function(error, data) {
  if (error) {
    logger.error(error);
  } else {
    // save in CSV file
    csv.save(data);
  }
});
