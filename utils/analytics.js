"use strict";

const logger = require("../utils/logger");
const stationCollection = require("../models/station-store.js");
const conversion = require("./conversion.js");

const analytics = {
  
  updateWeather(station) {
    if (station.readings.length > 0) {
      let lastReading = station.readings(station.readings.length - 1);
      station.tempC = lastReading.temperature;
      station.tempF = station.readings.push(conversion.tempF(lastReading.temperature));
      station.beaufort = conversion.beaufort(lastReading.windspeed);
    }
  }
}

module.exports = analytics;