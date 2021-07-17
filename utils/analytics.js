"use strict";

const logger = require("../utils/logger");
const stationCollection = require("../models/station-store.js");
const conversion = require("./conversion.js");

const analytics = {
  updateWeather(station) {
    if (station.readings.size() > 0) {
      let lastReading = station.readings.get(station.readings.size() - 1);
      station.tempC = lastReading.temperature;
      station.tempF = conversion.tempF(lastReading.temperature);
    }
  }
}