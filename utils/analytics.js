"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/station-store.js");
const conversion = require("./conversion.js");

const analytics = {
  windChill(temp, windspeed) {
    let windChill =  13.12 + 0.6215 * temp -  11.37 * (Math.pow(windspeed, 0.16)) + 0.3965 * temp * (Math.pow(windspeed, 0.16));
    return windChill.toFixed(2);
  },

  minWindSpeed(readings) {
  let minReading = readings[0];
  for (const reading of readings) {
    if (reading.windSpeed < minReading.windSpeed) {
      minReading = reading;
    }
  }
  return minReading.windSpeed;
},

  maxWindSpeed(readings) {
    let maxReading = readings[0];
    for (const reading of readings) {
      if (reading.windSpeed > maxReading.windSpeed) {
        maxReading = reading;
      }
    }
    return maxReading.windSpeed;
  },

  minTemp(readings) {
    let minReading = readings[0];
    for (const reading of readings) {
      if (reading.temperature < minReading.temperature) {
        minReading = reading;
      }
    }
    return minReading.temperature;
  },

  maxTemp(readings) {
    let maxReading = readings[0];
    for (const reading of readings) {
      if (reading.temperature > maxReading.temperature) {
        maxReading = reading;
      }
    }
    return maxReading.temperature;
  },

  minPressure(readings) {
    let minReading = readings[0];
    for (const reading of readings) {
      if (reading.pressure < minReading.pressure) {
        minReading = reading;
      }
    }
    return minReading.pressure;
  },

  maxPressure(readings) {
    let maxReading = readings[0];
    for (const reading of readings) {
      if (reading.pressure > maxReading.pressure) {
        maxReading = reading;
      }
    }
    return maxReading.pressure;
  },
};

module.exports = analytics;
