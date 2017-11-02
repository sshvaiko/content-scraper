'use strict';

const config = require('../config');
const fs = require('fs');
const json2csv = require('json2csv');
const logger = require('./logger');

function save(data) {
  // create folder for results if doesn't exist
  if (!fs.existsSync(config.folder)) {
    fs.mkdirSync(config.folder);
  }

  // generate file name
  let now = new Date();
  let fileName = now.getFullYear() + '-' + parseInt(now.getMonth() + 1);
  fileName += '-' + now.getDate() + '.csv';

  // generate new object (clean because it has "productInfo")
  let result = new Array();

  for (let prop in data) {
    // temp object to save data
    let productInfo = {};
    for (let itemProp in data[prop].productInfo) {
      productInfo[itemProp] = data[prop].productInfo[itemProp];
    }
    productInfo.URL = data[prop].URL;

    // generate date
    let date = new Date();
    productInfo.Time = date.toString();

    // add to result
    result.push(productInfo);
  }

  // generate csv
  let csv = json2csv({
    data: result,
    fields: config.fields
  });

  // save
  fs.writeFile(config.folder + fileName, csv, (error) => {
    if (error) throw error;
    logger.success("The CSV file has been saved.\n");
  });

}
module.exports.save = save;
