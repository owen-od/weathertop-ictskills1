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
  }
};

module.exports = analytics;
