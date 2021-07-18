"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/station-store.js");
const conversion = require("./conversion.js");

const analytics = {
  windChill(temp, windspeed) {
    let windChill =  13.12 + 0.6215 * temp -  11.37 * (Math.pow(windspeed, 0.16)) + 0.3965 * temp * (Math.pow(windspeed, 0.16));
    return windChill.toFixed(2);
  }
};

module.exports = analytics;
