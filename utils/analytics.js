"use strict";

const logger = require("../utils/logger");
const stationCollection = require("../models/station-store.js");
const conversion = require("./conversion.js");

const analytics = {
  latestWeather(station) {
    if (station.readings.length > 0) {
      let lastReading = station.readings[station.readings.length - 1];
      let tempFarenheit = conversion.tempF(lastReading.temperature);
      lastReading["tempF"] = tempFarenheit;
      let beaufort = conversion.beaufort(lastReading.windSpeed);
      lastReading["beaufort"] = beaufort;
    }
  }
};

module.exports = analytics;
