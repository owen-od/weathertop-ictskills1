"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/station-store.js");

const weatherConditions = new Map();

const conversion = {
   tempF(tempC) {
    return (tempC * 1.8) + 32;
  },
  
  beaufort (windspeed) {
     if (windspeed == 0) {
      return 0;
    } else if (windspeed >= 1 && windspeed <= 6) {
      return 1;
    } else if (windspeed >= 7 && windspeed <= 11) {
      return 2;
    } else if (windspeed >= 12 && windspeed <= 19) {
      return 3;
    } else if (windspeed >= 20 && windspeed <= 29) {
      return 4;
    } else if (windspeed >= 30 && windspeed <= 39) {
      return 5;
    } else if (windspeed >= 40 && windspeed <= 50) {
      return 6;
    } else if (windspeed >= 51 && windspeed <= 62) {
      return 7;
    } else if (windspeed >= 63 && windspeed <= 75) {
      return 8;
    } else if (windspeed >= 76 && windspeed <= 87) {
      return 9;
    } else if (windspeed >= 88 && windspeed <= 102) {
      return 10;
    } else if (windspeed >= 103 && windspeed <= 117) {
      return 11;
    } else if (windspeed >= 117) {
      return 12;
    }
    return -1;
  },
  
  degreesToCompass(windDirection) {
    const direction = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N"];
    let index = parseInt(Math.round((windDirection / 22.5)));
    return direction[index];
    },
    
  /*fillWeatherConditions() {
    weatherConditions.set(100, "Clear");
    weatherConditions.set(200, "Partial Clouds");
    weatherConditions.set(300, "Cloudy");
    weatherConditions.set(400, "Light Showers");
    weatherConditions.set(500, "Heavy Showers");
    weatherConditions.set(600, "Rain");
    weatherConditions.set(700, "Snow");
    weatherConditions.set(800, "Thunder");
  },
  
  codeToWeatherConditions(weatherCode) {
    fillWeatherConditions();
    let weather = weatherConditions.get(weatherCode);
    return weather;
    },*/
  
};

module.exports = conversion;