"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/station-store.js");
const conversion = require("./conversion.js");

const analytics = {
  latestWeather(station) {
    if (station.readings.length > 0) {
      let lastReading = station.readings[station.readings.length - 1];
      let tempFarenheit = conversion.tempF(lastReading.temperature);
      let beaufort = conversion.beaufort(lastReading.windSpeed);
      const latestWeather = [tempFarenheit, beaufort];
      return latestWeather;
    }
  },
  
  windChill(temp, windspeed) {
    let windChill =  13.12 + 0.6215 * temp -  11.37 * (Math.pow(windspeed, 0.16)) + 0.3965 * temp * (Math.pow(windspeed, 0.16));
    return windChill.toFixed(2);
  }
};

module.exports = analytics;
